const ProductCategory = require("../../models/product-category.model");
const createTree = require("../../helpers/createTree");
module.exports.category = async (req, res, next) => {
  const records = await ProductCategory.find({
    deleted: false,
  });
  const newRecords = createTree(records);
  res.locals.layoutProductsCategory = newRecords;
  next();
};
