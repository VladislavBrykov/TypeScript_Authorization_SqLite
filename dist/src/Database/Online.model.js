"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/database');
class Online extends Model {
}
;
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
});
module.exports = Online;
//# sourceMappingURL=Online.model.js.map