'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScholarshipCategory extends Model {
    static associate(models) {
      ScholarshipCategory.belongsTo(models.Scholarship, { foreignKey: 'scholarshipId', allowNull: false });
      ScholarshipCategory.belongsTo(models.Category, { foreignKey: 'categoryId', allowNull: false });
    }
  }
  ScholarshipCategory.init({
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
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ScholarshipCategory',
  });
  return ScholarshipCategory;
};
