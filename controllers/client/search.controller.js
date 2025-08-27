const Product = require("../../models/product.model");
const productCategoryHelper = require("../../helpers/product-category");
const productHelper = require("../../helpers/product");
// [GET] /
module.exports.index = async (req, res) => {
  console.log(req.query);
  keyword = req.query.keyword;
  const regex = new RegExp(keyword, "i");
  const products = await Product.find({
    status: "active",
    deleted: false,
    title: regex,
  });
  const newProducts = productHelper.priceNewProducts(products);
  res.render("client/pages/search/index", {
    pageTitle: "Kết quả tìm kiếm",
    products: newProducts,
    keyword: keyword,
  });
};
