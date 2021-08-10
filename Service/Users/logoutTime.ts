async function logoutTime(phone_email: string, newToken: string) {
    const Online = require('../../Models/Online.model');
    const User = require('../../Models/User.model');

    let res = await Online.findOne({ where: { id_user: phone_email } })
    if (res) {
        let seconds: number = new Date().getTime() / 1000;
        if ((seconds - res.lastTime) > 600) {
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
