'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('ClassTypes', [
      {
        typeName: 'workshop',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
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
