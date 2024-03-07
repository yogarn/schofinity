'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: 'userId', allowNull: false });
      Favorite.belongsTo(models.Scholarship, { foreignKey: 'scholarshipId', allowNull: false });
    }
  }
  Favorite.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    scholarshipId: {
      allowNull: false,
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 'Favorite',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'scholarshipId'],
      },
    ],
  });
  return Favorite;
};
