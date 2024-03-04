'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Locations', [
      {
        locationName: 'dalam negeri',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        locationName: 'luar negeri',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
