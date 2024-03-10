'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mentor extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: 'userId', allowNull: false });
      Mentor.belongsTo(models.Status, { foreignKey: 'statusId', allowNull: false });
      Mentor.hasMany(models.MentorSchedule, { foreignKey: 'mentorId', allowNull: false });
    }
  }
  Mentor.init({
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
    mentoringInterval: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    breakTime: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    salaryRate: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    statusId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Mentor',
  });
  return Mentor;
};