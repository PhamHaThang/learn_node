const productHelper = require("../../helpers/product");
const Product = require("../../models/product.model");
// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  });
  const newProducts = productHelper.priceNewProducts(products);
  res.render("client/pages/products/index", {
    pageTitle: "Trang danh sách sản phẩm",
    products: newProducts,
  });
};
// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  const product = await Product.findOne({
    status: "active",
    deleted: false,
    slug: req.params.slug,
  });
  console.log(product);
  res.render("client/pages/products/detail", {
    pageTitle: product.title,
    product: product,
  });
};
