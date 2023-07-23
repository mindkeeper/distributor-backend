"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      status: {
        type: Sequelize.ENUM,
        values: ["Pending", "Paid", "Cancelled"],
        defaultValue: "Pending",
        allowNull: false,
      },
      sender_id: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "users",
          key: "id",
        },
      },
      buyer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "buyers",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("now()"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("now()"),
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
    queryInterface.addIndex("transactions", ["status"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transactions");
  },
};
