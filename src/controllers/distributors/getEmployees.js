const asyncErrorHandler = require("../asyncErrorHandler");
const { DistributorUser, Sequelize } = require("../../models");
const CustomError = require("../../utils/CustomError");
const getPagination = require("../../utils/getPagination");
const getEmployeesHandler = asyncErrorHandler(async (req, res, next) => {
  const { name, role, page = 1, limit = 5 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  const { Op } = Sequelize;
  const conditions = {
    ...(!name ? {} : { name: { [Op.iLike]: `%${name.toLowerCase()}%` } }),
    ...(!role ? {} : { role }),
  };
  const { count, rows: employees } = await DistributorUser.findAndCountAll({
    where: conditions,
    offset,
    limit: parseInt(limit),
  });
  if (employees.length === 0)
    return next(new CustomError("Data pegawai tidak ditemukan", 404));
  const pagination = getPagination(count, req);
  return res
    .status(200)
    .json({ message: "success", data: { employees, pagination } });
});

module.exports = getEmployeesHandler;
