const User = require("../../models/user.model");
module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    res.redirect("/user/login");
    return;
  } else {
    const tokenUser = req.cookies.tokenUser;
    const user = await User.findOne({
      tokenUser: tokenUser,
      deleted: false,
      status: "active",
    }).select("-password");
    if (!user) {
      res.redirect(`/user/login`);
      return;
    } else {
      res.locals.user = user;
      next();
    }
  }
};
