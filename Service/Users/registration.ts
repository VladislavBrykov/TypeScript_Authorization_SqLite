async function registration(phoneEmail: string, password: string) {
    const User = require('../../Models/user.model');
    const Online = require('../../Models/online.model');
    const ResTypeid = require("./type.id");
    const token = require('./new.token');
    const typeId: string = ResTypeid.typeId(password)
    const newToken: string = await token.newToken()

    const sqlite = {
        "idUser": phoneEmail,
        "lastTime": "seconds",
    }
    await Online.create(sqlite);

    const sqlite_2 = {
        "phoneEmail": phoneEmail,
        "password": password,
        "token": newToken,
        "typeId": typeId
    }
    const searchUser = await User.findOne({ where: { phoneEmail: phoneEmail } })

    if (searchUser)
        return false
    else {
        await User.create(sqlite_2);
        return true
    }
}

module.exports = {
    registration: registration
}