'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Statuses', [
      {
        id: 1,
        statusName: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        statusName: 'success',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        statusName: 'failed',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Statuses', null, {});
  }
};
