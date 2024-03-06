'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('EducationLevels', [
      {
        levelName: 'd3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 's1/d4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 's2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 's4',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('EducationLevels', null, {});
  }
};
