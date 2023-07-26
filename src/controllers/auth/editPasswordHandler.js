const asyncErrorHandler = require("../asyncErrorHandler");
const { User } = require("../../models");
const CustomError = require("../../utils/CustomError");
const editPasswordHandler = asyncErrorHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.userPayload.id;
  const user = await User.findByPk(userId, { attributes: ["password", "id"] });
  const isValidPassword = await user.comparePassword(oldPassword);
  if (!isValidPassword) return next(new CustomError("Incorrect Password"));
  await user.updatePassword(newPassword);
  return res.status(200).json({ msg: "password changed", data: {} });
});

module.exports = editPasswordHandler;
