'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ClassPayments', {
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

    await queryInterface.addIndex('ClassPayments', ['userId', 'classId'], {
      unique: true,
      name: 'unique_class_combination'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ClassPayments');
  }
};