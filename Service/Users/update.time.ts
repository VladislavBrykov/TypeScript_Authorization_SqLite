async function updateTime(token: string) {
    const User = require('../../Models/user.model');
    const Online = require('../../Models/online.model');
    const searchUser = User.findOne({ where: { token: token } })

    if (searchUser) {
        const MS = 1000;
        const seconds: number = new Date().getTime() / MS;

        Online.update({ lastTime: seconds }, {
            where: {
                idUser: searchUser.phoneEmail
            }
        });
        return true
    }
    else {
        return false
    }
}

module.exports = {
    updateTime: updateTime
}