'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassPayment extends Model {
    static associate(models) {
      ClassPayment.belongsTo(models.User, { foreignKey: 'userId', allowNull: false });
      ClassPayment.belongsTo(models.OnlineClass, { foreignKey: 'classId', allowNull: false });
      ClassPayment.belongsTo(models.Status, { foreignKey: 'statusId', as: 'paymentStatus', allowNull: false });
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
      type: DataTypes.UUID,
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