const asyncErrorHandler = require("../asyncErrorHandler");
const { Distributor, sequelize } = require("../../models");
const createDistributorHandler = asyncErrorHandler(async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.userPayload.id;
    const {
      plan,
      address,
      phone,
      distributor_name: distributorName,
    } = req.body;
    const newDistributor = await Distributor.create(
      { plan, address, phone, distributorName, user_id: userId },
      { transaction: t }
    );
    await newDistributor.createEmployee(
      {
        user_id: userId,
        role: "Owner",
        name: req.userPayload.username,
      },
      { transaction: t }
    );
    await t.commit();
    return res.status(200).json({ msg: "success", data: { newDistributor } });
  } catch (error) {
    console.log(error);
    await t.rollback();
    next(error);
  }
});

module.exports = createDistributorHandler;
