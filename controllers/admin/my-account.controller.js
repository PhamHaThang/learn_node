const md5 = require("md5");
const systemConfig = require("../../config/systems");
const Account = require("../../models/account.model");
// [GET] /admin/my-account
module.exports.index = async (req, res) => {
  res.render("admin/pages/my-account/index", {
    pageTitle: "Thông tin cá nhân",
  });
};
// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
  res.render("admin/pages/my-account/edit", {
    pageTitle: "Chỉnh sửa thông tin cá nhân",
  });
};
// [PUT] /admin/my-account/edit
module.exports.editPut = async (req, res) => {
  const id = res.locals.user.id;
  try {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    const emailExist = await Account.findOne({
      _id: { $ne: id },
      email: req.body.email,
      deleted: false,
    });
    if (emailExist) {
      req.flash("error", "Email đã tồn tại");
      res.redirect(`${systemConfig.prefixAdmin}/my-account/edit`);
      return;
    }
    await Account.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật thông tin tài khoản thành công");
    res.redirect(`${systemConfig.prefixAdmin}/my-account/edit`);
  } catch (error) {
    req.flash("error", "Cập nhật thông tin tài khoản thất bại");
    res.redirect(`${systemConfig.prefixAdmin}/my-account`);
  }
};
