const md5 = require("md5");
const User = require("../../models/user.model");

// [GET] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký",
  });
};
// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail) {
    req.flash("error", "Email đã tồn tại");
    res.redirect(req.get("Referrer") || "/user/register");
    return;
  }
  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};
// [GET] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập",
  });
};
// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email, deleted: false });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect(req.get("Referrer") || "/user/login");
    return;
  }
  if (md5(password) !== user.password) {
    req.flash("error", "Sai mật khẩu");
    res.redirect(req.get("Referrer") || "/user/login");
    return;
  }
  if (user.status === "inactive") {
    req.flash("error", "Tài khoản đang bị kháo");
    res.redirect(req.get("Referrer") || "/user/login");
    return;
  }
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};
// [GET] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/");
};
