async function login(phoneEmail: string, password: string) {
    const User = require('../../Models/user.model');
    const Online = require('../../Models/online.model');
    const searchUser = await User.findOne({ where: { phoneEmail: phoneEmail, password: password } })

    if (searchUser) {
        const MS = 1000;
        const seconds: number = new Date().getTime() / MS;
        await Online.update({ lastTime: seconds }, {
            where: {
                idUser: phoneEmail
            }
        });
        const token = require('./newToken')
        const newToken: string = await token.newToken()

        await User.update({ token: newToken }, {
            where: {
                phoneEmail: phoneEmail
            }
        });
        async function func() {
            const statusOnline = require('./logout.time');
            await statusOnline.logoutTime(phoneEmail, newToken)
        }
        const timeMs = 600000;
        await setInterval(func, timeMs) //время жизни токена 10 min, после чего юзера вылогинивает если он бездействует
        return newToken
    }
    return ("login error")
}

module.exports = {
    login: login
}