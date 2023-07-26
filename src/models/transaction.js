"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Buyer, DistributorUser, Product, TransactionItem }) {
      // define association here
      this.belongsTo(Buyer, { foreignKey: "buyer_id" });
      this.belongsTo(DistributorUser, { foreignKey: "sender_id" });
      this.belongsToMany(Product, {
        through: TransactionItem,
        foreignKey: "transaction_id",
        otherKey: "productId",
      });
    }
  }
  Transaction.init(
    {
      status: {
        type: DataTypes.ENUM,
        values: ["Pending", "Paid", "Cancelled"],
        defaultValue: "Pending",
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["Sell", "Refund"],
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "Tramsaction type is required" },
        },
      },
      total: {
        type: DataTypes.BIGINT,
        validate: {
          isInt: { args: true, msg: "transaction total must be an integer" },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "transaction",
      underscored: true,
      paranoid: true,
      indexes: [{ unique: false, fields: ["status"] }],
    }
  );
  return Transaction;
};
