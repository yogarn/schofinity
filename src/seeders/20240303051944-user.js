'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'yogarn',
      password: 'root',
      name: 'Yoga Raditya Nala',
      contact: '+12345678910',
      profilePict: 'https://drive.google.com/',
      roleId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
