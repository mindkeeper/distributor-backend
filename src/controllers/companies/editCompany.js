const asyncErrorHandler = require("../asyncErrorHandler");
const { Company } = require("../../models");
const CustomError = require("../../utils/CustomError");
const editCompanyHandler = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const { role } = req.distributorPayload;
  if (role !== "Owner" && role !== "Admin")
    return next(new CustomError("anouthorized", 403));
  const company = await Company.findByPk(id, {
    attributes: ["id"],
  });
  if (!company) return next(new CustomError("perusahaan tidak ditemukan", 404));
  const [_, result] = await Company.update(req.body, {
    where: { id },
    returning: ["company_name", "phone", "address"],
  });
  console.log(req.body);
  return res
    .status(200)
    .json({ message: "success", data: { company: result } });
});

module.exports = editCompanyHandler;
