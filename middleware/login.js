const userModel = require("../model/userModel");

module.exports = async (req, res, next) => {
  req.user = { auth: false };
  if (req.query.logout !== undefined) {
    res.clearCookie("user");
    res.clearCookie("chash");
    res.user = { auth: false };
  } else {
    if (req.body.email !== undefined && req.body.password !== undefined) {
      let email = req.body.email.trim().toLowerCase();
      let pwd = req.body.password;

      const userStatus = await userModel.getAuthorizedWithPassword(email, pwd);
      req.user = userStatus;
      if (userStatus.auth) {
        res.cookie("user", userStatus.user.username, {
          maxAge: 1000 * 60 * 60 * 12,
        });
        res.cookie("chash", userStatus.cookieHash, {
          maxAge: 1000 * 60 * 60 * 12,
        });
      }
    } else if (
      req.cookies.user !== undefined &&
      req.cookies.chash !== undefined
    ) {
      req.user = await userModel.getAuthorizedWithHash(
        req.cookies.user,
        req.cookies.chash
      );
    }
  }
  next();
};
