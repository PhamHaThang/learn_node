const Cart = require("../../models/cart.model");
module.exports.cardId = async (req, res, next) => {
  if (!req.cookies.cardId) {
    const cart = new Cart();
    await cart.save();

    const expireCookie = 60 * 60 * 24 * 365 * 1000;
    res.cookie("cardId", cart.id, {
      expires: new Date(Date.now() + expireCookie),
    });
  } else {
  }
  next();
};
