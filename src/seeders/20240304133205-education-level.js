'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('EducationLevels', [
      {
        id: 1,
        educationName: 'd3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        educationName: 's1/d4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        educationName: 's2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        educationName: 's3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        educationName: 'aktif',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('EducationLevels', null, {});
  }
};
