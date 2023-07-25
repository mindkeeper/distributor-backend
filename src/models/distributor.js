"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Distributor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Buyer, Company, Product }) {
      // define association here
      this.belongsTo(User);
      this.hasMany(Buyer, { foreignKey: "distributor_id" });
      this.hasMany(Company, { foreignKey: "distributor_id" });
      this.hasMany(Product, { foreignKey: "distributor_id" });
    }
  }
  Distributor.init(
    {
      distributorName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "Distributor name is required" },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      plan: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
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
      modelName: "Distributor",
      tableName: "distributors",
      underscored: true,
      paranoid: true,
    }
  );
  return Distributor;
};
