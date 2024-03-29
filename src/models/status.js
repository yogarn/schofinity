'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      Status.hasMany(models.Scholarship, { foreignKey: 'statusId', as: 'scholarshipStatus', allowNull: false });
      Status.hasMany(models.User, { foreignKey: 'statusId', as: 'userStatus', allowNull: false });
      Status.hasMany(models.Mentor, { foreignKey: 'statusId', as: 'mentorStatus', allowNull: false });
      Status.hasMany(models.ClassPayment, { foreignKey: 'statusId', as: 'paymentStatus', allowNull: false });
    }
  }
  Status.init({
    statusName: { 
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};