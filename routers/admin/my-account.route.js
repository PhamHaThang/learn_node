const express = require("express");
const controller = require("../../controllers/admin/my-account.controller");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const route = express.Router();

route.get("/", controller.index);
route.get("/edit", controller.edit);
route.put(
  "/edit",
  upload.single("avatar"),
  uploadCloud.upload,
  controller.editPut
);
module.exports = route;
