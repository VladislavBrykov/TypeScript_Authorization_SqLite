import { Model, DataTypes } from 'sequelize'
import sequelize from '../Config/database'

class Online extends Model {
  lastTime: number
};

Online.init({
  idUser: {
    type: DataTypes.STRING
  },
  lastTime: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'online',
  timestamps: false,
  underscored: true
})

export default Online