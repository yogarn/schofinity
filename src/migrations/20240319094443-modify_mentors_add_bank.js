'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Mentors', 'bank', {
      allowNull: false,
      type: Sequelize.STRING
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Mentors', 'bank');
  }
};
