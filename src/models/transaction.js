"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Buyer, User }) {
      // define association here
      this.belongsTo(Buyer, { foreignKey: "buyer_id" });
      this.belongsTo(User, { foreignKey: "sender_id" });
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
