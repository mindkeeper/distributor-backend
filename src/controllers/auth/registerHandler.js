const { User, sequelize } = require("../../models");
const asyncErrorHandler = require("../asyncErrorHandler");

const registerHandler = asyncErrorHandler(async (req, res) => {
  await User.create({
    ...req.body,
  });
  return res.status(201).json({ msg: "akun berhasil dibuat" });
});
module.exports = registerHandler;
