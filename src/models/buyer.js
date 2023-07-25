"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Buyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Area, Transaction, Distributor }) {
      // define association here
      this.belongsTo(Area, { foreignKey: "area_id" });
      this.hasMany(Transaction, { foreignKey: "buyer_id" });
      this.belongsTo(Distributor, { foreignKey: "distributor_id" });
    }
  }
  Buyer.init(
    {
      buyerName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: "buyer name already exist" },
        validate: {
          notNull: { args: true, msg: "buyer name is required" },
        },
      },
      address: DataTypes.STRING,
      phone: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
            msg: "invalid phone number format",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Buyer",
      tableName: "buyers",
      underscored: true,
    }
  );
  return Buyer;
};
