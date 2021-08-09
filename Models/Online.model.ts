const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

class Online extends Model { };

Online.init({
  id_user: {
    type: DataTypes.STRING
  },
  lastTime: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'online',
  timestamps: false
})

module.exports = Online;

export { }