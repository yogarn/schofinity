'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EducationLevel extends Model {
    static associate(models) {
      EducationLevel.belongsToMany(models.Scholarship, { through: 'ScholarshipEducationLevels', as: 'educations' });
    }
  }
  EducationLevel.init({
    educationName: {
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