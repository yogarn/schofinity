'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'roleId', allowNull: false });
      User.belongsTo(models.Status, { foreignKey: 'statusId', allowNull: false });
      User.hasOne(models.Mentor, { foreignKey: 'userId', allowNull: false });
      User.hasMany(models.Favorite, { foreignKey: 'userId', allowNull: false });
      User.hasMany(models.Scholarship, { foreignKey: 'userId', allowNull: false });
      User.hasMany(models.Mentoring, { foreignKey: 'userId', allowNull: false });
      User.hasMany(models.ClassPayment, { foreignKey: 'userId', allowNull: false });
      User.hasMany(models.Feedback, { foreignKey: 'userId', allowNull: false });
      User.hasMany(models.ResourceComment, { foreignKey: 'userId', allowNull: false });
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    contact: {
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    birthDate: {
      type: DataTypes.DATE
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'else')
    },
    address: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.TEXT
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    statusId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    otp: {
      allowNull: true,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
