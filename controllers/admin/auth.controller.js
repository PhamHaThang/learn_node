const Account = require("../../models/account.model");
const systemConfig = require("../../config/systems");
const md5 = require("md5");
// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const user = await Account.findOne({ token: token, deleted: false });
    if (user) {
      res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } else {
      res.render("admin/pages/auth/login", {
        pageTitle: "Đăng nhập",
      });
    }
  } else {
    res.render("admin/pages/auth/login", {
      pageTitle: "Đăng nhập",
    });
  }
};
// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Account.findOne({ email: email, deleted: false });
    if (!user) {
      req.flash("error", "Email không tồn tại");
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
      return;
    }
    if (md5(password) != user.password) {
      req.flash("error", "Mật khẩu không chính xác");
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
      return;
    }
    if (user.status != "active") {
      req.flash("error", "Tài khoản đã bị khóa");
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
      return;
    }
    res.cookie("token", user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  } catch (error) {
    req.flash("error", "Lỗi đăng nhập");
  }
};
// [GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};
