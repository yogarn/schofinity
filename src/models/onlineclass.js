'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OnlineClass extends Model {
    static associate(models) {
      OnlineClass.belongsTo(models.Category, { foreignKey: 'categoryId', allowNull: false });
      OnlineClass.belongsTo(models.Mentor, { foreignKey: 'mentorId', allowNull: false });
      OnlineClass.belongsTo(models.ClassType, { foreignKey: 'typeId', allowNull: false });
    }
  }
  OnlineClass.init({
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
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.TEXT
    },
    community: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    typeId: {
      allowNull: false,
      type: DataTypes.INTEGER
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
    modelName: 'OnlineClass',
  });
  return OnlineClass;
};