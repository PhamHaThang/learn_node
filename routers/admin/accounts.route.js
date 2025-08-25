const express = require("express");
const controller = require("../../controllers/admin/account.controller");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/account.validate");
const route = express.Router();
route.get("/", controller.index);
route.get("/create", controller.create);
route.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);
route.get("/edit/:id", controller.edit);
route.put(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.editPut,
  controller.editPut
);
module.exports = route;
