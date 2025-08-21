const express = require("express");
const controller = require("../../controllers/admin/products.controller");
const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const validate = require("../../validates/admin/product.validate");
const upload = multer({ storage: storageMulter() });

const route = express.Router();
route.get("/", controller.index);
route.patch("/change-status/:status/:id", controller.changeStatus);
route.patch("/change-multi", controller.changeMulti);
route.delete("/delete/:id", controller.deleteItem);
route.get("/create", controller.create);
route.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  controller.createPost
);
route.get("/edit/:id", controller.edit);
route.put("/edit/:id", upload.single("thumbnail"), controller.editPut);
route.get("/detail/:id", controller.detail);
module.exports = route;
