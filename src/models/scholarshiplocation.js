'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScholarshipLocation extends Model {
    static associate(models) {
      ScholarshipLocation.belongsTo(models.Scholarship, { foreignKey: 'scholarshipId', allowNull: false });
      ScholarshipLocation.belongsTo(models.Location, { foreignKey: 'locationId', allowNull: false });
    }
  }
  ScholarshipLocation.init({
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
    locationId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ScholarshipLocation',
  });
  return ScholarshipLocation;
};
