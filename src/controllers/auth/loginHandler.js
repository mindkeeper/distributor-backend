const asyncErrorHandler = require("../asyncErrorHandler");
const { User, Role, Token } = require("../../models");
const { Op } = require("sequelize");
const CustomError = require("../../utils/CustomError");
const makeJWT = require("../../utils/makeJWT");

const loginHandler = asyncErrorHandler(async (req, res, next) => {
  const { emailOrUsername, password } = req.body;
  if (!emailOrUsername)
    return next(new CustomError("email or username is required", 400));
  if (!password) return next(new CustomError("password is required", 400));
  const user = await User.findOne({
    where: {
      [Op.or]: [{ username: emailOrUsername }, { email: emailOrUsername }],
    },
    attributes: ["id", "username", "email", "password"],
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["role_name"],
      },
    ],
  });

  if (!user)
    return next(new CustomError("username or password is wrong!", 401));
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword)
    return next(new CustomError("username or password is wrong!", 401));

  const role = user.role;

  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: role.dataValues.role_name,
  };
  const token = makeJWT(payload);
  await Token.destroy({ where: { user_id: user.id } });
  await Token.create({ token, user_id: user.id });
  return res.status(200).json({ msg: "success", data: { token, ...payload } });
});

module.exports = loginHandler;
