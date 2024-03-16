'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      Subject.belongsToMany(models.OnlineClass, { through: 'ClassSubjects', as: 'subjects' });
    }
  }
  Subject.init({
    subjectName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};