'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Roles', [
      {
        roleName: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'mentor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
