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
    return queryInterface.bulkInsert("distributors", [
      {
        id: "0cff49ee-c05b-4980-b7fb-232efb60f449",
        distributor_name: "testing hehe",
        phone: "081235648794",
        address: "sadadjlkdasj",
        plan: "{analytic,next}",
        user_id: "e30b5faa-120e-4ac8-b960-8458ae3b8886",
        created_at: "2023-07-31 06:34:25.288+00",
        updated_at: "2023-07-31 06:34:25.288+00",
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
