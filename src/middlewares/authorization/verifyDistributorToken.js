const jwt = require("jsonwebtoken");
const { Token } = require("../../models");
const asyncErrorHandler = require("../../controllers/asyncErrorHandler");
const CustomError = require("../../utils/CustomError");
const verifyToken = asyncErrorHandler(async (req, res, next) => {
  const token = req.headers["distributor-token"];
  // console.log(token);
  if (!token) return next(new CustomError("no token provided", 401));

  const { DIST_SECRET, DIST_ISSUER } = process.env;
  jwt.verify(token, DIST_SECRET, { issuer: DIST_ISSUER }, (err, payload) => {
    if (err) return next(catchError(err));
    req.distributorPayload = payload;
    return next();
  });
});

function catchError(err) {
  if (err instanceof jwt.TokenExpiredError)
    return new CustomError("Token Expired", 401);
  return new CustomError("Anauthorized", 401);
}
module.exports = verifyToken;
