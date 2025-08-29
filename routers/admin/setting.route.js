const express = require("express");
const controller = require("../../controllers/admin/setting.controller");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const route = express.Router();
route.get("/general", controller.settingGeneral);
route.put(
  "/general",
  upload.single("logo"),
  uploadCloud.upload,
  controller.settingGeneralPut
);

module.exports = route;
