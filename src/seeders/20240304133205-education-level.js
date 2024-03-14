'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('EducationLevels', [
      {
        id: 1,
        levelName: 'd3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        levelName: 's1/d4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        levelName: 's2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        levelName: 's3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('EducationLevels', null, {});
  }
};
