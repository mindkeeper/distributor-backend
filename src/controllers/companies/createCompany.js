const CustomError = require("../../utils/CustomError");
const asyncErrorHandler = require("../asyncErrorHandler");
const { Company } = require("../../models");
const createCompanyHandler = asyncErrorHandler(async (req, res, next) => {
  const { role, distributor_id: distributorId } = req.distributorPayload;

  const { company_name: companyName, phone, address } = req.body;
  if (role !== "Admin" && role !== "Owner")
    return next(
      new CustomError(
        "Hanya admin dan owner yang bisa menggunakan fitur ini",
        403
      )
    );

  const company = await Company.create({
    companyName,
    phone,
    address,
    distributor_id: distributorId,
  });

  return res.status(201).json({ message: "created", data: { company } });
});

module.exports = createCompanyHandler;
