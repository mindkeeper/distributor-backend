const asyncErrorHandler = require("../../controllers/asyncErrorHandler");
const { DistributorUser } = require("../../models");
const CustomError = require("../../utils/CustomError");
module.exports = function allowedRoles(allowedRoles) {
  return asyncErrorHandler(async (req, res, next) => {
    const { userId } = req.userPayload;
    const { distributorId } = req.params.distributorId;
    const role = await DistributorUser.findOne({
      where: { user_id: userId, distributor_Id: distributorId },
      attributes: ["role"],
    });

    if (!role || !allowedRoles.includes(role)) {
      const err = new CustomError("forbidden", 403);
      return next(err);
    }
    req.distributorId = distributorId;
    return next();
  });
};
