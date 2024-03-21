'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Mentors', 'bank', {
      allowNull: false,
      type: Sequelize.STRING
    });

    await queryInterface.addColumn('Mentors', 'education', {
      allowNull: false,
      type: Sequelize.STRING
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Mentors', 'bank');
    await queryInterface.removeColumn('Mentors', 'education');
  }
};
