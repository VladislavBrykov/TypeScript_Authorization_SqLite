async function login(phone_email: string, password: string) {
    const User = require('../../Models/User.model');
    const Online = require('../../Models/Online.model');

    let res = await User.findOne({ where: { phone_email: phone_email, password: password } })
    if (res) {
        let seconds: number = new Date().getTime() / 1000;
        await Online.update({ lastTime: seconds }, {
            where: {
                id_user: phone_email
            }
        });
        let token: any = require('./newToken')
        let newToken: string = await token.newToken()

        await User.update({ token: newToken }, {
            where: {
                phone_email: phone_email
            }
        });
        async function func() {
            const status_online: any = require('./logoutTime');
            await status_online.logoutTime(phone_email, newToken)
        }
        await setInterval(func, 600000) //время жизни токена 10 min, после чего юзера вылогинивает если он бездействует
        return newToken
    }
}

module.exports = {
    login: login
}