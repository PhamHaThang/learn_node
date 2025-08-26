const Account = require("../../models/account.model");
const Role = require("../../models/roles.model");
const md5 = require("md5");
const systemConfig = require("../../config/systems");
// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  let find = { deleted: false };
  const records = await Account.find(find).select("-password -token");
  for (const record of records) {
    const role = await Role.findOne({ _id: record.role_id, deleted: false });
    record.role = role.title;
  }
  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};
// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  try {
    const roles = await Role.find({ deleted: false });
    res.render("admin/pages/accounts/create", {
      pageTitle: "Tạo tài khoản",
      roles: roles,
    });
  } catch (error) {}
};
// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  try {
    const emailExist = await Account.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (emailExist) {
      req.flash("error", "Email đã tồn tại");
      res.redirect("/admin/accounts/create");
      return;
    }
    req.body.password = md5(req.body.password);
    const account = new Account(req.body);
    await account.save();
    req.flash("success", "Tạo tài khoản thành công");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  } catch (error) {
    req.flash("error", "Tạo tài khoản thất bại");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  let find = {
    _id: req.params.id,
    deleted: false,
  };
  try {
    const data = await Account.findOne(find);
    const roles = await Role.find({ deleted: false });
    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      roles: roles,
      data: data,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
// [PUT] /admin/accounts/edit/:id
module.exports.editPut = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    const emailExist = await Account.findOne({
      _id: { $ne: req.params.id },
      email: req.body.email,
      deleted: false,
    });
    if (emailExist) {
      req.flash("error", "Email đã tồn tại");
      res.redirect("/admin/accounts/create");
      return;
    }
    await Account.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật tài khoản thành công");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  } catch (error) {
    req.flash("error", "Cập nhật khoản thất bại");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
