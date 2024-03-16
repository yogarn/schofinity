'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.OnlineClass, { foreignKey: 'categoryId', allowNull: false });
      Category.belongsToMany(models.Scholarship, { through: 'ScholarshipCategories', as: 'categories' });
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