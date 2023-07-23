"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Buyer }) {
      // define association here
      this.hasMany(Buyer, { foreignKey: "area_id" });
    }
  }
  Area.init(
    {
      areaName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Area already registered",
        },
        validate: {
          notNull: { args: true, msg: "area name is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Area",
      tableName: "areas",
      underscored: true,
    }
  );
  return Area;
};
