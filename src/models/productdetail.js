"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      // define association here
      this.belongsTo(Product, { foreignKey: "product_id" });
    }
  }
  ProductDetail.init(
    {
      buy_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { args: true, msg: "buy price must be an integer" },
          notNull: { args: true, msg: "product detail buy price is required" },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: "stock in product detail must be an integer",
          },
          notNull: { args: true, msg: "stock in product detail is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "ProductDetail",
      tableName: "product_details",
      underscored: true,
    }
  );
  return ProductDetail;
};
