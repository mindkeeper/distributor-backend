const asyncErrorHandler = require("../asyncErrorHandler");
const { Sequelize, Company } = require("../../models");
const getPagination = require("../../utils/getPagination");
const getCompaniesHandler = asyncErrorHandler(async (req, res, next) => {
  const { page = 1, limit = 5, name } = req.query;
  const { distributor_id } = req.distributorPayload;
  const { Op } = Sequelize;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  const conditions = {
    ...(!name
      ? {}
      : { companyName: { [Op.iLike]: `%${name.toLowerCase()}%` } }),
    distributor_id,
  };
  const { count, rows: companies } = await Company.findAndCountAll({
    offset,
    limit,
    where: conditions,
    attributes: ["id", "company_name", "address", "phone"],
  });

  const pagination = getPagination(count, page, limit);

  return res
    .status(200)
    .json({ message: "success", data: { companies, pagination } });
});

module.exports = getCompaniesHandler;
