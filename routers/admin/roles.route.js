const express = require("express");
const controller = require("../../controllers/admin/roles.controller");
const route = express.Router();
route.get("/", controller.index);
route.get("/create", controller.create);
route.post("/create", controller.createPost);
route.get("/edit/:id", controller.edit);
route.put("/edit/:id", controller.editPut);
module.exports = route;
