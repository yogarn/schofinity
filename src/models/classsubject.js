'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassSubject extends Model {
    static associate(models) {
      ClassSubject.belongsTo(models.OnlineClass, { foreignKey: 'onlineClassId', allowNull: false });
      ClassSubject.belongsTo(models.Subject, { foreignKey: 'subjectId', allowNull: false });
    }
  }
  ClassSubject.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    onlineClassId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    subjectId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ClassSubject',
  });
  return ClassSubject;
};
