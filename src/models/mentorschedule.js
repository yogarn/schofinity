'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MentorSchedule extends Model {
    static associate(models) {
      MentorSchedule.belongsTo(models.Mentor, { foreignKey: 'mentorId', allowNull: false });
    }
  }
  MentorSchedule.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    mentorId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    day: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    startTime: {
      allowNull: false,
      type: DataTypes.TIME
    },
    endTime: {
      allowNull: false,
      type: DataTypes.TIME
    }
  }, {
    sequelize,
    modelName: 'MentorSchedule',
  });
  return MentorSchedule;
};