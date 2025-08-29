module.exports.registerPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập họ tên");
    res.redirect(req.get("Referrer") || "/user/register");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu");
    res.redirect(req.get("Referrer") || "/user/register");
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email");
    res.redirect(req.get("Referrer") || "/user/register");
    return;
  }
  next();
};
module.exports.loginPost = (req, res, next) => {
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu");
    res.redirect(req.get("Referrer") || "/user/login");
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email");
    res.redirect(req.get("Referrer") || "/user/login");
    return;
  }
  next();
};
module.exports.resetPasswordPost = (req, res, next) => {
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu mới");
    res.redirect(req.get("Referrer"));
    return;
  }
  if (!req.body.passwordConfirm) {
    req.flash("error", "Vui lòng nhập mật khẩu xác nhận");
    res.redirect(req.get("Referrer"));
    return;
  }
  if (req.body.password !== req.body.passwordConfirm) {
    req.flash("error", "Mật khẩu không khớp");
    res.redirect(req.get("Referrer"));
    return;
  }
  next();
};
