const CustomError = require("./CustomError");

module.exports = function checkPassword(password) {
  if (password.length < 6 || password > 20)
    throw new CustomError("password must be 6-20 character long", 400);
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)/gm;
  if (!passRegex.test(password)) {
    throw new CustomError(
      "password must contain at least one character and one number",
      400
    );
  }
};
