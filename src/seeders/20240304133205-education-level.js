'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('EducationLevels', [
      {
        levelName: 'aktif',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 's1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 's2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('EducationLevels', null, {});
  }
};
