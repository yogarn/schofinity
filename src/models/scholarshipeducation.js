'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScholarshipEducationLevel extends Model {
    static associate(models) {
      ScholarshipEducationLevel.belongsTo(models.Scholarship, { foreignKey: 'scholarshipId', allowNull: false });
      ScholarshipEducationLevel.belongsTo(models.EducationLevel, { foreignKey: 'educationLevelId', allowNull: false });
    }
  }
  ScholarshipEducationLevel.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    scholarshipId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    educationLevelId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    minSemester: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    maxSemester: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ScholarshipEducationLevel',
  });
  return ScholarshipEducationLevel;
};
