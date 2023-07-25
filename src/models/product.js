"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Company, Transaction, TransactionItem, Distributor }) {
      // define association here
      this.belongsTo(Company, { foreignKey: "company_id" });
      this.belongsToMany(Transaction, {
        through: TransactionItem,
        foreignKey: "product_id",
        otherKey: "transaction_id",
      });
      this.belongsTo(Distributor, { foreignKey: "distributor_id" });
    }
  }
  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5],
            msg: "Product title must be minimum of 5 character",
          },
          notNull: {
            msg: "product title is required",
          },
        },
      },
      inCarton: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "product in carton is required",
          },
          isInt: {
            args: true,
            msg: "must be an integer",
          },
          min: {
            args: 1,
            msg: "minimum product in a carton is 1",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "stock product is required",
          },
          isInt: {
            args: true,
            msg: "product stock must be an integer",
          },
          min: {
            args: 0,
            msg: "minimum of product is 0",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      underscored: true,
      paranoid: true,
      indexes: [
        { name: "price_gt_50k", fields: ["price"], where: { [Op.gt]: 50000 } },
        {
          name: "price_gt_100k",
          fields: ["price"],
          where: { [Op.gt]: 100000 },
        },
        {
          name: "price_gt_150k",
          fields: ["price"],
          where: { [Op.gt]: 150000 },
        },
      ],
    }
  );
  return Product;
};
