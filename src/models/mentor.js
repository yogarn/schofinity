'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mentor extends Model {
    static associate(models) {
      Mentor.belongsTo(models.Status, { foreignKey: 'statusId', allowNull: false });
      Mentor.belongsTo(models.User, { foreignKey: 'userId', allowNull: false });
      Mentor.hasMany(models.MentorSchedule, { foreignKey: 'mentorId', allowNull: false });
      Mentor.hasMany(models.Mentoring, { foreignKey: 'mentorId', allowNull: false });
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
      unique: true,
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
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Mentor',
  });
  return Mentor;
};