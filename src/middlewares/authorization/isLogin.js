const jwt = require("jsonwebtoken");
const { Token } = require("../../models");
const asyncErrorHandler = require("../../controllers/asyncErrorHandler");
const CustomError = require("../../utils/CustomError");
const isLogin = asyncErrorHandler(async (req, res, next) => {
  if (!req.headers.authorization)
    return new CustomError("you have to login first", 403);

  const token = req.headers.authorization
    .split(" ")
    .filter((value) => value !== "Bearer")[0];
  if (!token) return new CustomError("you have to login first", 403);

  const checkToken = await Token.findOne({ where: { token } });
  if (!checkToken) return new CustomError("you have to login first", 403);

  const { SECRET_KEY, ISSUER } = process.env;
  jwt.verify(token, SECRET_KEY, { issuer: ISSUER }, (err, payload) => {
    if (err) {
      console.log(err);
      return new CustomError(err.message, 403);
    }
    req.userPayload = payload;
    console.log(req.userPayload);
    return next();
  });
});

module.exports = isLogin;
