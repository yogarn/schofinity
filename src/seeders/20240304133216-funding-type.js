'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('FundingTypes', [
      {
        typeName: 'pemerintah',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        typeName: 'swasta',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('FundingTypes', null, {});
  }
};
