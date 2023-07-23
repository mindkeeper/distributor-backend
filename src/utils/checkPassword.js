module.exports = function checkPassword(password) {
  if (password.length < 6 || password > 20)
    throw new Error("password must be 6-20 character long");
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)/gm;
  if (!passRegex.test(password)) {
    throw new Error(
      "password must contain at least one character and one number"
    );
  }
};
