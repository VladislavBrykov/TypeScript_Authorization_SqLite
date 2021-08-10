async function infouser(token: string) {
    const User = require('../../Models/user.model');
    const Online = require('../../Models/online.model');
    let searchUser = await User.findOne({ where: { token: token } })

    if (searchUser) {
        const MS = 1000;
        const seconds: number = new Date().getTime() / MS;

        Online.update({ lastTime: seconds }, {
            where: {
                idUser: searchUser.phoneEmail
            }
        });

        const informationUser = {
            id: searchUser.phoneEmail,
            typeId: searchUser.typeId
        }
        return (informationUser)
    }
    else
        return { "errr": false }
}

module.exports = {
    infouser: infouser
}