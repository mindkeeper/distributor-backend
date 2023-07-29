const asyncErrorHandler = require("../asyncErrorHandler");
const { Company } = require("../../models");
const CustomError = require("../../utils/CustomError");
const getByIdHandler = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const company = await Company.findByPk(id, {
    attributes: ["id", "company_name", "phone", "address"],
  });
  if (!company) return next(new CustomError("perusahaan tidak ditemukan", 404));
  return res.status(200).json({ message: "success", data: { company } });
});

module.exports = getByIdHandler;
