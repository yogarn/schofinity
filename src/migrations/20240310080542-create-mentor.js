'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mentors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userId: {
        allowNull: false,
        unique: true,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
        onDelete: 'CASCADE'
      },
      mentoringInterval: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      breakTime: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      salaryRate: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      statusId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Statuses',
          key: 'id',
          as: 'statusId',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mentors');
  }
};