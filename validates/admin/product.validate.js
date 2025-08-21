module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Vui lòng nhập tiêu đề");
    res.redirect(req.get("Referrer") || "/admin/products/create");
    return;
  }
  if (req.body.title.length < 8) {
    req.flash("error", "Vui lòng nhập tiêu đề ít nhất 8 ký tự");
    res.redirect(req.get("Referrer") || "/admin/products/create");
    return;
  }
  next();
};
