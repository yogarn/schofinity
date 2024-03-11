'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mentorings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      mentorId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Mentors',
          key: 'id',
          as: 'mentorId',
        },
      },
      resource: {
        type: Sequelize.STRING
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
        unique: 'unique_mentoring_combination',
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE,
        unique: 'unique_mentoring_combination',
      },
      orderId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
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
        },
      },
      transactionToken: {
        type: Sequelize.UUID
      },
      rating: {
        type: Sequelize.INTEGER
      },
      feedback: {
        type: Sequelize.STRING
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

    await queryInterface.addIndex('Mentorings', ['startDate', 'endDate'], {
      unique: true,
      name: 'unique_mentoring_combination'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mentorings');
  }
};