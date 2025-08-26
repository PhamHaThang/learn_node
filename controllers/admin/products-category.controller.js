const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/systems");
const createTree = require("../../helpers/createTree");
// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);
  const newRecords = createTree(records);
  res.render("admin/pages/products-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
  });
};
// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = { deleted: false };
  const records = await ProductCategory.find(find);
  const newRecords = createTree(records);
  res.render("admin/pages/products-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords,
  });
};
// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  const permissions = res.locals.role.permissions;
  if (permissions.includes("product-category_create")) {
    if (req.body.position == "") {
      const countProducts = await ProductCategory.countDocuments();
      req.body.position = countProducts + 1;
    } else {
      req.body.position = +req.body.position;
    }
    const productCategory = new ProductCategory(req.body);
    await productCategory.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  } else {
    res.send("403");
    return;
  }
};
// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    let find = { _id: req.params.id, deleted: false };
    const record = await ProductCategory.findOne(find);
    const records = await ProductCategory.find({ deleted: false });
    const newRecords = createTree(records);
    res.render("admin/pages/products-category/edit", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      record: record,
      records: newRecords,
    });
  } catch (error) {
    req.flash("error", "Không tìm thấy danh mục sản phẩm");
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
};
// [PUT] /admin/products-category/edit/:id
module.exports.editPut = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.body.position == "") {
      const countProducts = await ProductCategory.countDocuments();
      req.body.position = countProducts + 1;
    } else {
      req.body.position = +req.body.position;
    }
    await ProductCategory.updateOne({ _id: id }, req.body);
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  } catch (error) {
    req.flash("error", "Lưu thông tin thất bại");
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
};
