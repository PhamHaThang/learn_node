const systemConfig = require("../../config/systems");
const Account = require("../../models/account.model");
module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  } else {
    const token = req.cookies.token;
    const user = await Account.findOne({ token: token, deleted: false });
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
      return;
    } else {
      next();
    }
  }
};
