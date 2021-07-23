const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/database');

class User extends Model {};

User.init({
  phone_email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  token: {
    type: DataTypes.STRING
  },
  type_id: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: false
})

module.exports = User;