'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResourceComment extends Model {
    static associate(models) {
      ResourceComment.belongsTo(models.User, { foreignKey: 'userId', allowNull: false });
      ResourceComment.belongsTo(models.ClassResource, { foreignKey: 'resourceId', allowNull: false });
    }
  }
  ResourceComment.init({
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
    resourceId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    comment: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'ResourceComment',
  });
  return ResourceComment;
};
