'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Statuses', [
      {
        statusName: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusName: 'success',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
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
