const asyncErrorHandler = require("../asyncErrorHandler");
const { User, Role, Token, sequelize } = require("../../models");
const { Op } = require("sequelize");
const CustomError = require("../../utils/CustomError");
const { createToken, createRefreshToken } = require("../../utils/jwtHelper");

const loginHandler = asyncErrorHandler(async (req, res, next) => {
  const { emailOrUsername, password } = req.body;
  if (!emailOrUsername)
    return next(new CustomError("email or username is required", 400));
  if (!password) return next(new CustomError("password is required", 400));
  const user = await User.findOne({
    where: {
      [Op.or]: [{ username: emailOrUsername }, { email: emailOrUsername }],
    },
    attributes: {
      exclude: ["deletedAt", "createdAt", "updatedAt", "resetOtp"], // List of attributes to exclude from the result
    },
  });

  if (!user)
    return next(new CustomError("username or password is wrong!", 401));
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword)
    return next(new CustomError("username or password is wrong!", 401));
  delete user.dataValues.password;

  const token = createToken({ ...user.dataValues });
  const refreshToken = createRefreshToken({ ...user.dataValues });
  return res
    .status(200)
    .json({ msg: "success", data: { token, refresh_token: refreshToken } });
});

module.exports = loginHandler;
