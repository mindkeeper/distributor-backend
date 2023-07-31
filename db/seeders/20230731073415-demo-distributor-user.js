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
    return queryInterface.bulkInsert("distributor_user", [
      {
        id: "ddc263b8-b886-43af-91ca-eea671e2ccad",
        role: "Admin",
        name: "john doe",
        distributor_id: "0cff49ee-c05b-4980-b7fb-232efb60f449",
        user_id: "ce0fd2da-13cb-4658-8784-076018023d62",
        created_at: "2023-07-31 06:37:38.213+00",
        updated_at: "2023-07-31 06:37:38.213+00",
      },
      {
        id: "e61fd1c0-66a0-4f4e-8cf3-a3309c33a30b",
        role: "Sales",
        name: "Coba Sales 2",
        distributor_id: "0cff49ee-c05b-4980-b7fb-232efb60f449",
        user_id: "33830f45-51fb-4f12-8141-c363f39a6755",
        created_at: "2023-07-31 06:37:38.213+00",
        updated_at: "2023-07-31 06:37:38.213+00",
      },
      {
        id: "f6c825c9-5f60-4758-8385-ad28d5d38afe",
        role: "Owner",
        name: "ownertest",
        distributor_id: "0cff49ee-c05b-4980-b7fb-232efb60f449",
        user_id: "e30b5faa-120e-4ac8-b960-8458ae3b8886",
        created_at: "2023-07-31 06:34:25.361+00",
        updated_at: "2023-07-31 06:34:25.361+00",
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
