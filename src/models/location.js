'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.belongsToMany(models.Scholarship, { through: 'ScholarshipCategories', as: 'locations' });
    }
  }
  Location.init({
    locationName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};