const asyncErrorHandler = require("../asyncErrorHandler");
const { Distributor, DistributorUser, User } = require("../../models");
const CustomError = require("../../utils/CustomError");
const getDistributorDetail = asyncErrorHandler(async (req, res, next) => {
  const distributorId = req.params.distributorId;

  const distributor = await Distributor.findByPk(distributorId, {
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt", "plan", "user_id"],
    },
  });
  const employees = await distributor.getEmployees({
    attributes: ["id", "name", "role", "user_id"],
  });
  if (!distributor)
    return next(new CustomError("distributor tidak ditemukan", 404));
  return res
    .status(200)
    .json({ msg: "success", data: { distributor, employees } });
});
module.exports = getDistributorDetail;
