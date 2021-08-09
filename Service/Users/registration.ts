async function registration(phone_email: string, password: string) {
    const User = require('../../Models/User.model');
    const Online = require('../../Models/Online.model');
    const typeId = require("./typeId");
    let type_id = typeId.typeId(password)

    console.log(type_id);
    let token: any = require('./newToken')
    let newToken: string = await token.newToken()

    let sqlite = {
        "id_user": phone_email,
        "lastTime": "seconds",
    }
    await Online.create(sqlite);

    let sqlite_2 = {
        "phone_email": phone_email,
        "password": password,
        "token": newToken,
        "type_id": type_id
    }

    let res = await User.findOne({ where: { phone_email: phone_email } })
    if (res)
        return (false)
    else {
        await User.create(sqlite_2);
        return (true)
    }
}

module.exports = {
    registration: registration
}