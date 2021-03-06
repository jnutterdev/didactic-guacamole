'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Favorites, {
        foreignKey: 'userId'
      })
    }
    static associate(models) {
      User.hasMany(models.MyTrips, {
        foreignKey: 'userId'
      });
    }
    s
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    myTripId: DataTypes.INTEGER,
    travelDates: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};