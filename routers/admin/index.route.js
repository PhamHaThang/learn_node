const systemConfig = require("../../config/systems.js");
const dashboardRoutes = require("./dashboard.route.js");
const productsRoutes = require("./products.route.js");
const productsCategoryRoutes = require("./products-category.route.js");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
  app.use(PATH_ADMIN + "/products", productsRoutes);
  app.use(PATH_ADMIN + "/products-category", productsCategoryRoutes);
};
