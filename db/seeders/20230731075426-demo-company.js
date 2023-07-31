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
    return await queryInterface.bulkInsert("companies", [
      {
        id: "1a03e3cc-02e4-4b42-81ca-91cf7cfe5c18",
        company_name: "Danone",
        phone: "08123345543",
        address: "Jalanmu",
        distributor_id: "0cff49ee-c05b-4980-b7fb-232efb60f449",
        created_at: "2023-07-31 06:40:31.002+00",
        updated_at: "2023-07-31 06:40:31.002+00",
      },
      {
        id: "3477e9f3-529c-4fbb-bf42-471d6f3020c5",
        company_name: "Djarum",
        phone: "08123345543",
        address: "Jalanmu",
        distributor_id: "0cff49ee-c05b-4980-b7fb-232efb60f449",
        created_at: "2023-07-31 06:38:57.352+00",
        updated_at: "2023-07-31 06:38:57.352+00",
      },
      {
        id: "59cf8d43-bad7-4b4d-97cc-91da193fd245",
        company_name: "Kino",
        phone: "08123345543",
        address: "Jalanmu",
        distributor_id: "0cff49ee-c05b-4980-b7fb-232efb60f449",
        created_at: "2023-07-31 06:40:18.016+00",
        updated_at: "2023-07-31 06:40:18.016+00",
      },
      {
        id: "74f860cf-e530-4862-b021-38887ecc48cd",
        company_name: "Mayora",
        phone: "08123345543",
        address: "Jalanmu",
        distributor_id: "0cff49ee-c05b-4980-b7fb-232efb60f449",
        created_at: "2023-07-31 06:39:13.971+00",
        updated_at: "2023-07-31 06:39:13.971+00",
      },
      {
        id: "83c365b6-6976-4c26-8aa2-3d3be6d0cec9",
        company_name: "Cleo",
        phone: "08123345543",
        address: "Jalanmu",
        distributor_id: "0cff49ee-c05b-4980-b7fb-232efb60f449",
        created_at: "2023-07-31 06:40:44.362+00",
        updated_at: "2023-07-31 06:40:44.362+00",
      },
      {
        id: "d1b4c1a3-70e1-4218-a55f-569c73ebab54",
        company_name: "Holiland",
        phone: "08123345543",
        address: "Jalanmu",
        distributor_id: "0cff49ee-c05b-4980-b7fb-232efb60f449",
        created_at: "2023-07-31 06:40:12.79+00",
        updated_at: "2023-07-31 06:40:12.79+00",
      },
      {
        id: "dab02a07-7fe1-4efb-8cad-e2d29204e4b6",
        company_name: "Wings Food",
        phone: "08123345543",
        address: "Jalanmu",
        distributor_id: "0cff49ee-c05b-4980-b7fb-232efb60f449",
        created_at: "2023-07-31 06:40:56.239+00",
        updated_at: "2023-07-31 06:40:56.239+00",
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
