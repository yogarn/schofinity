'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Locations', [
      {
        id: 1,
        locationName: 'dalam negeri',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
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
