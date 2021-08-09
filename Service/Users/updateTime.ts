async function updateTime(token: string) {
    const User = require('../../Models/User.model');
    const Online = require('../../Models/Online.model');

    let res = User.findOne({ where: { token: token } })
    if (res) {
        let seconds: number = new Date().getTime() / 1000;

        Online.update({ lastTime: seconds }, {
            where: {
                id_user: res.phone_email
            }
        });
        return true
    }
    else
        return false
}

module.exports = {
    updateTime: updateTime
}