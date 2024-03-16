'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ScholarshipEducationLevels', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      scholarshipId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Scholarships',
          key: 'id',
          as: 'scholarshipId'
        },
        onDelete: 'CASCADE',
      },
      educationLevelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'EducationLevels',
          key: 'id',
          as: 'educationLevelId'
        }
      },
      minSemester: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      maxSemester: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('ScholarshipEducationLevels');
  }
};
