"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      this.hasMany(Product);
    }
  }
  Company.init(
    {
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "company name required",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "phone already taken!",
        },
        validate: {
          notNull: { msg: "phone number required" },
          is: {
            args: /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
            msg: "invalid phone number format",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "companies",
      underscored: true,
    }
  );
  return Company;
};
