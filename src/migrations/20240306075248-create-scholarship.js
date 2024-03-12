'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Scholarships', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
        onDelete: 'CASCADE'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.TEXT
      },
      benefit: {
        type: Sequelize.TEXT
      },
      requirement: {
        type: Sequelize.TEXT
      },
      link: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      educationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'EducationLevels',
          key: 'id',
          as: 'educationId',
        }
      },
      maxSemester: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      typeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'FundingTypes',
          key: 'id',
          as: 'typeId',
        }
      },
      locationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
          as: 'locationId',
        }
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
          as: 'categoryId',
        }
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
    await queryInterface.dropTable('Scholarships');
  }
};