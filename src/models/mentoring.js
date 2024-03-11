'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mentoring extends Model {
    static associate(models) {
      Mentoring.belongsTo(models.User, { foreignKey: 'userId', allowNull: false });
      Mentoring.belongsTo(models.Mentor, { foreignKey: 'mentorId', allowNull: false });
      Mentoring.belongsTo(models.Status, { foreignKey: 'statusId', allowNull: false });
    }
  }
  Mentoring.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    mentorId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    resource: {
      type: DataTypes.TEXT
    },
    startDate: {
      allowNull: false,
      unique: 'unique_mentoring_combination',
      type: DataTypes.DATE
    },
    endDate: {
      allowNull: false,
      unique: 'unique_mentoring_combination',
      type: DataTypes.DATE
    },
    orderId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    statusId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    transactionToken: {
      type: DataTypes.UUID
    },
    rating: {
      type: DataTypes.INTEGER
    },
    feedback: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Mentoring',
    indexes: [
      {
        unique: true,
        fields: ['startDate', 'endDate'],
      },
    ],
  });
  return Mentoring;
};