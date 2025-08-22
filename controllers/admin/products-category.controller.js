const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/systems");
// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  const records = await ProductCategory.find(find);

  res.render("admin/pages/products-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: records,
  });
};
// [GET] /admin/products-category/create
module.exports.create = (req, res) => {
  res.render("admin/pages/products-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
  });
};
// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const countProducts = await ProductCategory.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = +req.body.position;
  }
  const productCategory = new ProductCategory(req.body);
  await productCategory.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};
