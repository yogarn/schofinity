'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workshop extends Model {
    static associate(models) {
      Workshop.belongsTo(models.Category, { foreignKey: 'categoryId', allowNull: false });
      Workshop.belongsTo(models.Mentor, { foreignKey: 'mentorId', allowNull: false });
    }
  }
  Workshop.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    mentorId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    price: {
      allowNull: false,
      type: DataTypes.DOUBLE
    }
  }, {
    sequelize,
    modelName: 'Workshop',
  });
  return Workshop;
};