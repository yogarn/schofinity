'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Categories', [
      {
        categoryName: 'prestasi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'non-prestasi',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
