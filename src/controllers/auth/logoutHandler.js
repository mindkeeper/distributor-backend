const { Token } = require("../../models");
const asyncErrorHandler = require("../asyncErrorHandler");

const logoutHandler = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.userPayload;
  await Token.destroy({ where: { user_id: userId } });
  return res.status(200).json({ msg: "logout success" });
});

module.exports = logoutHandler;
