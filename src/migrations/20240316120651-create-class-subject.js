'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ClassSubjects', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      onlineClassId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'OnlineClasses',
          key: 'id',
          as: 'onlineClassId'
        },
        onDelete: 'CASCADE',
      },
      subjectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Subjects',
          key: 'id',
          as: 'subjectId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ClassSubjects');
  }
};
