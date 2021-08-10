async function logoutTime(phoneEmail: string, newToken: string) {
    const Online = require('../../Models/online.model');
    const User = require('../../Models/user.model');
    const searchUser = await Online.findOne({ where: { id_user: phoneEmail } })

    if (searchUser) {
        const MS = 1000;
        const tenMin = 600;
        const seconds: number = new Date().getTime() / MS;
        if ((seconds - searchUser.lastTime) > tenMin) {
            User.update({ token: "0" }, {
                where: {
                    token: newToken
                }
            })
            return true
        }
    }
    else
        return false
}

module.exports = {
    logoutTime: logoutTime
}
