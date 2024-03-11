'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassPayment extends Model {
    static associate(models) {
      ClassPayment.belongsTo(models.User, { foreignKey: 'userId', allowNull: false });
      ClassPayment.belongsTo(models.OnlineClass, { foreignKey: 'classId', allowNull: false });
      ClassPayment.belongsTo(models.Status, { foreignKey: 'statusId', allowNull: false });
    }
  }
  ClassPayment.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      allowNull: false,
      unique: 'unique_class_combination',
      type: DataTypes.UUID
    },
    classId: {
      allowNull: false,
      unique: 'unique_class_combination',
      type: DataTypes.UUID
    },
    orderId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    statusId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    rating: {
      type: DataTypes.INTEGER
    },
    feedback: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'ClassPayment',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'classId'],
      },
    ],
  });
  return ClassPayment;
};