const jwt = require("jsonwebtoken");
module.exports = {
  createToken(payload) {
    const { EXPIRES_IN, ISSUER, SECRET_KEY } = process.env;
    const token = jwt.sign(payload, SECRET_KEY, {
      issuer: ISSUER,
      expiresIn: EXPIRES_IN,
    });
    return token;
  },
  createRefreshToken(payload) {
    const { REFRESH_TOKEN_SECRET_KEY, REFRESH_TOKEN_ISSUER } = process.env;
    const token = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
      issuer: REFRESH_TOKEN_ISSUER,
    });
    return token;
  },
  createDistributorToken(payload) {
    const { DIST_SECRET, DIST_ISSUER } = process.env;
    const token = jwt.sign(payload, DIST_SECRET, {
      issuer: DIST_ISSUER,
    });
    return token;
  },
};
