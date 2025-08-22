const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const systemConfig = require("../../config/systems");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
// [GET] /admin/products
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);
  const find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  //Pagination
  const countProducts = await Product.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts
  );

  //End Pagination
  let sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: type });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`
      );
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      req.flash("success", `Xóa thành công ${ids.length} sản phẩm!`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        console.log(id, position);
        await Product.updateOne({ _id: id }, { position: +position });
      }
      req.flash(
        "success",
        `Thay đổi vị trí thành công ${ids.length} sản phẩm!`
      );
      break;
    default:
      break;
  }

  res.redirect(`${systemConfig.prefixAdmin}/products`);
};
// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  );
  // await Product.deleteOne({ _id: id });
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};
// [GET] /admin/products/create
module.exports.create = (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
  });
};
// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = +req.body.price;
  req.body.discountPercentage = +req.body.discountPercentage;
  req.body.stock = +req.body.stock;
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = +req.body.position;
  }
  const product = new Product(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};
// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const find = { _id: id, deleted: false };
    const product = await Product.findOne(find);
    res.render("admin/pages/products/edit", {
      pageTitle: "Sửa sản phẩm",
      product: product,
    });
  } catch (error) {
    req.flash("error", "Không tồn tại sản phẩm");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

// [PUT] /admin/products/edit/:id
module.exports.editPut = async (req, res) => {
  req.body.price = +req.body.price;
  req.body.discountPercentage = +req.body.discountPercentage;
  req.body.stock = +req.body.stock;
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = +req.body.position;
  }
  // if (req.file) {
  //   req.body.thumbnail = `/uploads/${req.file.filename}`;
  // }
  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật thành công");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  } catch (error) {
    req.flash("error", "Cập nhật thất bại");
    res.redirect(req.get("Referrer") || "/admin/products");
    console.log(error);
  }
};
// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const find = { _id: id, deleted: false };
    const product = await Product.findOne(find);
    res.render("admin/pages/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    req.flash("error", "Không tồn tại sản phẩm");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
