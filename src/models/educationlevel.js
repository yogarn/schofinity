'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EducationLevel extends Model {
    static associate(models) {
      EducationLevel.hasMany(models.Scholarship, { foreignKey: 'educationId', allowNull: false });
    }
  }
  EducationLevel.init({
    levelName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'EducationLevel',
  });
  return EducationLevel;
};