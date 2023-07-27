const { DistributorUser, sequelize, Sequelize } = require("../../models");
const CustomError = require("../../utils/CustomError");
const asyncErrorHandler = require("../asyncErrorHandler");

const removeEmployeesHandler = asyncErrorHandler(async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { role, distributor_id: distributorId } = req.distributorPayload;
    if (role === "Sales")
      return next(
        new CustomError("Sales tidak bisa mengahpus pegawai lain", 403)
      );
    const { employeeIds } = req.body;
    const { Op } = Sequelize;
    if (employeeIds.length === 0)
      return next(new CustomError("data pegawai belum dimasukkan!", 400));

    const employees = await DistributorUser.findAll({
      where: { id: { [Op.in]: employeeIds } },
      attributes: ["role", "name", "id"],
    });

    if (
      role === "Admin" &&
      employees.some(
        (employee) => employee.role === "Owner" || employee.role === "Admin"
      )
    )
      return next(
        new CustomError("Admin tidak bisa mengeluarkan Admin atau Owner!", 403)
      );

    await DistributorUser.destroy({
      where: { id: { [Op.in]: employeeIds } },
      transaction: t,
    });
    await t.commit();
    return res.status(200).json({ employees });
  } catch (error) {
    console.log(error);
    await t.rollback();
    next(error);
  }
});
module.exports = removeEmployeesHandler;
