const CustomError = require("../../utils/CustomError");
const jwt = require("jsonwebtoken");
const { createToken, createRefreshToken } = require("../../utils/jwtHelper");

const refreshTokenHandler = (req, res, next) => {
  const refreshToken = req.headers["refresh-token"];

  if (!refreshToken)
    return new CustomError("refresh-token is not provided", 401);

  const { REFRESH_TOKEN_SECRET_KEY, REFRESH_TOKEN_ISSUER } = process.env;

  jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET_KEY,
    { issuer: REFRESH_TOKEN_ISSUER },
    (err, payload) => {
      const { iss, iat, ...newPayload } = payload;
      const token = createToken(newPayload);
      const refreshToken = createRefreshToken(newPayload);
      if (err) return next(catchError(err));
      return res
        .status(200)
        .json({ msg: "success", data: { token, refresh_token: refreshToken } });
    }
  );
};

function catchError(err) {
  const { TokenExpiredError } = jwt;
  if (err instanceof TokenExpiredError)
    return new CustomError("Token Expired", 401);
  return new CustomError("Anauthorized", 401);
}

module.exports = refreshTokenHandler;
