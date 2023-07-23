const jwt = require("jsonwebtoken");
module.exports = function makeJWT(payload) {
  const { EXPIRES_IN, ISSUER, SECRET_KEY } = process.env;
  const token = jwt.sign(payload, SECRET_KEY, {
    issuer: ISSUER,
    expiresIn: EXPIRES_IN,
  });
  return token;
};
