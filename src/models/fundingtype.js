'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FundingType extends Model {
    static associate(models) {
      FundingType.hasMany(models.Scholarship, { foreignKey: 'typeId', allowNull: false });
    }
  }
  FundingType.init({
    typeName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'FundingType',
  });
  return FundingType;
};