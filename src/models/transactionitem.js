"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Transaction, Product }) {
      // define association here
      this.belongsTo(Transaction, { foreignKey: "transaction_id" });
      this.belongsTo(Product, { foreignKey: "product_id" });
    }
  }
  TransactionItem.init(
    {
      buyPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { args: true, msg: "item buy price must be an integer" },
          notNull: { args: true, msg: "item buy price is required" },
        },
      },
      sellPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { args: true, msg: "item sell price must be an integer" },
          notNull: { args: true, msg: "item sell price is required" },
        },
      },
      subtotal: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isInt: { args: true, msg: "item subtotal must be an integer" },
          notNull: { args: true, msg: "item subtotal is required" },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { args: true, msg: "item quantity must be an integer" },
          notNull: { args: true, msg: "item quantity is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "TransactionItem",
      tableName: "transaction_item",
      underscored: true,
    }
  );
  return TransactionItem;
};
