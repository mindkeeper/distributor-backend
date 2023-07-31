"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DistributorUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Distributor, Transaction }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(Distributor, {
        foreignKey: "distributor_id",
        as: "distributor",
      });
      this.hasMany(Transaction, { foreignKey: "sender_id" });
    }
  }
  DistributorUser.init(
    {
      role: {
        type: DataTypes.ENUM,
        values: ["Owner", "Admin", "Sales", "Operational Manager"],
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          len: { args: [3], msg: "nama user terlalu pendek" },
        },
      },
    },
    {
      sequelize,
      modelName: "DistributorUser",
      tableName: "distributor_user",
      underscored: true,
    }
  );
  return DistributorUser;
};
