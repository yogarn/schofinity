'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        roleName: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        roleName: 'mentor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
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
