'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Scholarship, { foreignKey: 'categoryId', allowNull: false });
      Category.hasMany(models.Workshop, { foreignKey: 'categoryId', allowNull: false });
    }
  }
  Category.init({
    categoryName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};