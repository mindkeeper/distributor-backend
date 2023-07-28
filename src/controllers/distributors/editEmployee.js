const CustomError = require("../../utils/CustomError");
const asyncErrorHandler = require("../asyncErrorHandler");
const { DistributorUser } = require("../../models");
const editEmployeeHandler = asyncErrorHandler(async (req, res, next) => {
  const id = req.params.id;
  const { role } = req.distributorPayload;
  if (role !== "Admin" && role !== "Owner")
    return next(
      new CustomError("Selain admin dan owner tidak bisa mengubah data", 403)
    );
  if (req.body.role === "Owner")
    return next(new CustomError("tidak bisa merubah role menjadi owner", 403));
  const employee = await DistributorUser.findByPk(id, { attributes: ["role"] });
  if (!employee) return next(new CustomError(`id tidak ditemukan`, 404));
  if (req.body.role && (employee.role === "Owner" || employee.role === "Admin"))
    return next(
      new CustomError("Admin tidak bisa merubah role Admin atau Owner", 403)
    );
  const [_, result] = await DistributorUser.update(req.body, {
    where: { id },
    returning: ["id", "name", "role"],
  });
  return res.status(200).json({ message: "", data: { employee: result } });
});

module.exports = editEmployeeHandler;
