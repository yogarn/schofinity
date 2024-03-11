'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassType extends Model {
    static associate(models) { 
      ClassType.hasMany(models.OnlineClass, { foreignKey: 'typeId', allowNull: false });
    }
  }
  ClassType.init({
    typeName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ClassType',
  });
  return ClassType;
};