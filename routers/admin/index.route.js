const systemConfig = require("../../config/systems.js");
const dashboardRoutes = require("./dashboard.route.js");
const productsRoutes = require("./products.route.js");
const productsCategoryRoutes = require("./products-category.route.js");
const rolesRoutes = require("./roles.route.js");
const accountsRoutes = require("./accounts.route.js");
const authRoutes = require("./auth.route.js");
const authMiddleware = require("../../middlewares/admin/auth.middleware.js");
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddleware.requireAuth,
    dashboardRoutes
  );
  app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productsRoutes);
  app.use(
    PATH_ADMIN + "/products-category",
    authMiddleware.requireAuth,
    productsCategoryRoutes
  );
  app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, rolesRoutes);
  app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountsRoutes);
  app.use(PATH_ADMIN + "/auth", authRoutes);
};
