const asyncErrorHandler = require("../asyncErrorHandler");
const { DistributorUser } = require("../../models");
const CustomError = require("../../utils/CustomError");
const { createDistributorToken } = require("../../utils/jwtHelper");
const createTokenHandler = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userPayload.id;
  const distributorId = req.params.distributorId;

  const payload = await DistributorUser.findOne({
    where: { user_id: userId, distributor_id: distributorId },
    attributes: ["id", "name", "user_id", "distributor_id", "role"],
  });
  console.log(payload);
  if (!payload) return next(new CustomError("Data tidak ditemukan", 404));
  const token = createDistributorToken(payload.toJSON());
  return res.status(201).json({ msg: "success", data: { token } });
});

module.exports = createTokenHandler;
