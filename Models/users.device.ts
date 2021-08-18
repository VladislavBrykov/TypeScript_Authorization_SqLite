import { Model, DataTypes } from 'sequelize';
import sequelize from '../Config/database';

class UserDevice extends Model {
  static findOneAndDelete(arg0: { token: null; }, arg1: { where: { token: string; }; }) {
    throw new Error('Method not implemented.');
  }

    phoneEmail: string;

    token: string;
}

UserDevice.init({
  phoneEmail: {
    type: DataTypes.STRING,
  },
  token: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'userDevice',
  timestamps: false,
});

export default UserDevice;
