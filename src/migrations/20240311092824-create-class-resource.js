'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ClassResources', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      classId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'OnlineClasses',
          key: 'id',
          as: 'classId',
        },
        onDelete: 'CASCADE'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.TEXT
      },
      resource: {
        allowNull: false,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('ClassResources');
  }
};