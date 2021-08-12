import { Model, DataTypes } from 'sequelize'
import sequelize from '../Config/database'

class UserDevice extends Model {
    phoneEmail: string
    token: string
};

UserDevice.init({
    phoneEmail: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING
    },
}, {
    sequelize,
    modelName: 'userDevice',
    timestamps: false
})

export default UserDevice