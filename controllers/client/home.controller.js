const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");
// [GET] /
module.exports.index = async (req, res) => {
  const productsFeatured = await Product.find({
    deleted: false,
    featured: "1",
    status: "active",
  }).limit(6);
  const newProducts = productHelper.priceNewProducts(productsFeatured);
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProducts,
  });
};
