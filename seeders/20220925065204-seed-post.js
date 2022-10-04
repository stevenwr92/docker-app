"use strict";

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
    let dataPost = require("../data.json").posts;
    dataPost.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    // console.log(dataPost);
    await queryInterface.bulkInsert("Posts", dataPost);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Posts");
  },
};
