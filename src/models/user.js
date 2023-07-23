"use strict";
const { Model } = require("sequelize");
const checkPassword = require("../utils/checkPassword");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role, Transaction, Token }) {
      // define association here
      this.belongsTo(Role, { as: "role", foreignKey: "role_id" });
      this.hasMany(Transaction);
      this.hasOne(Token, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "username already taken!",
        },
        validate: {
          isLowercase: {
            args: true,
            msg: "username must be lowercase!",
          },
          len: {
            args: [6, 20],
            msg: "username must be 6-20 character!",
          },
          notNull: {
            msg: "username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "email already taken!",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid email format!",
          },
          notNull: {
            msg: "email is required",
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkPassword,
          notNull: { args: true, msg: "password is required" },
        },
      },
      resetOtp: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: { args: [6, 6], msg: "OTP must be 6 character long" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      paranoid: true,
      indexes: [
        { unique: true, fields: ["email"] },
        { unique: true, fields: ["phone"] },
        { unique: true, fields: ["username"] },
      ],
    }
  );
  User.beforeCreate(async (user, _) => {
    const password = await bcrypt.hash(user.password, 10);
    user.password = password;
  });

  User.prototype.comparePassword = async function (params) {
    try {
      return await bcrypt.compare(params, this.password);
    } catch (error) {
      console.log(error);
      throw new Error("error comparing password");
    }
  };
  return User;
};
