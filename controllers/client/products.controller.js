const productHelper = require("../../helpers/product");
const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productCategoryHelper = require("../../helpers/product-category");
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
// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  const category = await ProductCategory.findOne({
    deleted: false,
    slug: req.params.slugCategory,
  });

  const listSubCategory = (
    await productCategoryHelper.getSubCategory(category.id)
  ).map((item) => item.id);

  const products = await Product.find({
    status: "active",
    deleted: false,
    product_category_id: { $in: [category.id, ...listSubCategory] },
  }).sort({ position: "desc" });

  res.render("client/pages/products/index", {
    pageTitle: category.title,
    products: products,
  });
};
