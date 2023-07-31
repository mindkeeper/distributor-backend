const asyncErrorHandler = require("../asyncErrorHandler");
const { Product, ProductDetail, sequelize } = require("../../models");
const CustomError = require("../../utils/CustomError");
const createProductHandler = asyncErrorHandler(async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { role, distributor_id } = req.distributorPayload;
    if (role !== "Admin")
      return next(new CustomError("Hanya admin yang bisa input produk", 403));
    const {
      title,
      stock,
      in_carton,
      sell_price: price,
      buy_price,
      company_id,
    } = req.body;
    const product = await Product.create(
      {
        title,
        company_id,
        distributor_id,
        stock,
        inCarton: in_carton,
        price,
      },
      { transaction: t }
    );
    await ProductDetail.create(
      { buy_price, stock, product_id: product.id },
      { transaction: t }
    );
    await t.commit();
    return res.status(201).json({ message: "created", data: { product } });
  } catch (error) {
    console.log(error);
    await t.rollback();
    next(error);
  }
});

module.exports = createProductHandler;
