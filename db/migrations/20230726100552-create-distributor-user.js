"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("distributor_user", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      role: {
        type: Sequelize.ENUM,
        values: ["Owner", "Admin", "Sales"],
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      distributor_id: {
        type: Sequelize.UUID,
        references: {
          model: "distributors",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("distributor_user");
  },
};
