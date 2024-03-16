'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Subjects', [
      {
        id: 1,
        subjectName: 'toefl',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        subjectName: 'wawancara',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Subjects', null, {});
  }
};
