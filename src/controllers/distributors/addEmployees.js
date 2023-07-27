const { DistributorUser, sequelize } = require("../../models");
const CustomError = require("../../utils/CustomError");
const asyncErrorHandler = require("../asyncErrorHandler");

const addEmployeesHandler = asyncErrorHandler(async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { role, distributor_id: distributorId } = req.distributorPayload;
    const { employees } = req.body;

    if (employees.length === 0)
      return next(new CustomError("data pegawai tidak dimasukkan", 400));
    if (role === "Sales")
      return next(new CustomError("Sales tidak bisa menambahkan pegawai", 403));

    if (
      role === "Admin" &&
      employees.some((employee) => employee.role === "Owner")
    )
      return next(new CustomError("Admin tidak bisa menambahkan Owner", 403));
    const createdEmployees = await DistributorUser.bulkCreate(
      employees.map((employee) => ({
        ...employee,
        distributor_id: distributorId,
      })),
      { transaction: t }
    );
    await t.commit();
    return res.status(201).json({
      message: "created",
      data: { employees: createdEmployees },
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    next(error);
  }
});
module.exports = addEmployeesHandler;
