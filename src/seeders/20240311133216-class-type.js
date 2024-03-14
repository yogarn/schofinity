'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('ClassTypes', [
      {
        id: 1,
        typeName: 'workshop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        typeName: 'bootcamp',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('ClassTypes', null, {});
  }
};
