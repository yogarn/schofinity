'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scholarship extends Model {
    static associate(models) {
      Scholarship.belongsTo(models.EducationLevel, { foreignKey: 'educationId', allowNull: false });
      Scholarship.belongsTo(models.FundingType, { foreignKey: 'typeId', allowNull: false });
      Scholarship.belongsTo(models.Location, { foreignKey: 'locationId', allowNull: false });
      Scholarship.belongsTo(models.Category, { foreignKey: 'categoryId', allowNull: false });
      Scholarship.belongsTo(models.Status, { foreignKey: 'statusId', allowNull: false });
      Scholarship.hasMany(models.Favorite, { foreignKey: 'scholarshipId', allowNull: false });
      Scholarship.belongsTo(models.User, { foreignKey: 'userId', allowNull: false });
    }
  }
  Scholarship.init({
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
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    company: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.TEXT
    },
    benefit: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    requirement: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    link: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    educationId: {
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
    },
    typeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    locationId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    statusId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Scholarship',
  });
  return Scholarship;
};