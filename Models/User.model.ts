const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

class User extends Model { };

User.init({
  phoneEmail: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  token: {
    type: DataTypes.STRING
  },
  typeId: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: false
})

module.exports = User;