const systemConfig = require("../../config/systems");
const SettingGeneral = require("../../models/setting-general.model");
// [GET] /admin/setting/general
module.exports.settingGeneral = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});
  res.render("admin/pages/setting/general", {
    pageTitle: "Cài đặt chung",
    settingGeneral: settingGeneral,
  });
};
// [PUT] /admin/setting/general
module.exports.settingGeneralPut = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});
  if (settingGeneral) {
    await SettingGeneral.updateOne({ _id: settingGeneral.id }, req.body);
  } else {
    const record = new SettingGeneral(req.body);
    await record.save();
  }
  req.flash("success", "Cập nhật cài đặt chung thành công!");
  res.redirect(
    req.get("Referrer") || `${systemConfig.prefixAdmin}/settings/general`
  );
};
