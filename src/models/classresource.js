'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassResource extends Model {
    static associate(models) {
      ClassResource.belongsTo(models.OnlineClass, { foreignKey: 'classId', allowNull: false });
      ClassResource.hasMany(models.ResourceComment, { foreignKey: 'resourceId', allowNull: false });
    }
  }
  ClassResource.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    classId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    resource: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'ClassResource',
  });
  return ClassResource;
};