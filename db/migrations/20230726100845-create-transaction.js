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
      transaction_type: {
        type: Sequelize.ENUM,
        values: ["Sell", "Refund"],
        allowNull: false,
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      due: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      total: {
        type: Sequelize.BIGINT,
      },
      sender_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "distributor_user",
          key: "id",
        },
      },
      admin_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          key: "id",
          model: "distributor_user",
        },
      },
      buyer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "buyers",
          key: "id",
        },
      },
      distributor_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "distributors",
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transactions");
  },
};
