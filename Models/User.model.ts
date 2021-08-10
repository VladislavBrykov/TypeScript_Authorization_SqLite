import { Model, DataTypes } from 'sequelize'
import sequelize from '../Config/database'

class User extends Model {
  phoneEmail: string
  typeId: string
  token: string
};

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

export default User