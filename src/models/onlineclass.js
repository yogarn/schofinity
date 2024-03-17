'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OnlineClass extends Model {
    static associate(models) {
      OnlineClass.belongsTo(models.Mentor, { foreignKey: 'mentorId', allowNull: false });
      OnlineClass.belongsTo(models.ClassType, { foreignKey: 'typeId', as: 'classType', allowNull: false });
      OnlineClass.hasMany(models.ClassPayment, { foreignKey: 'classId', allowNull: false });
      OnlineClass.hasMany(models.ClassResource, { foreignKey: 'classId', allowNull: false });
      OnlineClass.belongsToMany(models.Subject, { through: 'ClassSubjects', as: 'subjects' });
    }
  }
  OnlineClass.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    mentorId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.TEXT
    },
    community: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    typeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    price: {
      allowNull: false,
      type: DataTypes.DOUBLE
    }
  }, {
    sequelize,
    modelName: 'OnlineClass',
  });
  return OnlineClass;
};