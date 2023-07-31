"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("users", [
      {
        id: "33830f45-51fb-4f12-8141-c363f39a6755",
        username: "salestest",
        email: "sales@tesdt.com",
        phone: "0814456897454",
        password:
          "$2b$10$aAQBgf9/Urm8cT5Jt22rd.5/xp9B9Nw854E4e4iUb/kFTNP1X0JE6",
        reset_otp: null,
        created_at: "2023-07-31 06:32:47.743+00",
        updated_at: "2023-07-31 06:32:47.743+00",
        deleted_at: null,
      },
      {
        id: "ce0fd2da-13cb-4658-8784-076018023d62",
        username: "admintest",
        email: "admin@tesdt.com",
        phone: "0814456897453",
        password:
          "$2b$10$uR7vcwvM/E9usIgZHc1bre4rRWw1SCGsdYa1L.yRR9IsMIvoFzp/e",
        reset_otp: null,
        created_at: "2023-07-31 06:32:27.867+00",
        updated_at: "2023-07-31 06:32:27.867+00",
        deleted_at: null,
      },
      {
        id: "e30b5faa-120e-4ac8-b960-8458ae3b8886",
        username: "ownertest",
        email: "owner@tesdt.com",
        phone: "0814456897455",
        password:
          "$2b$10$ZMFq1sserbBWhDk/BQzyOOFOvBJNCxl1tqkQVErBb.ZkobYFRCWhy",
        reset_otp: null,
        created_at: "2023-07-31 06:33:10.13+00",
        updated_at: "2023-07-31 06:33:10.13+00",
        deleted_at: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
