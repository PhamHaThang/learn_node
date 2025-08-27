const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/cart.controller");
// [POST] /cart/add/:productId
router.post("/add/:productId", controller.addPost);

module.exports = router;
