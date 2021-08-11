import Online from '../../Models/online.model'
import User from '../../Models/user.model'
import tokenCreator from './new.token'
import logoutTime from './logout.time'

async function login(phoneEmail: string, password: string) {
    const searchUser = await User.findOne({ where: { phoneEmail: phoneEmail, password: password } })

    if (searchUser) {
        const MS = 1000;
        const seconds: number = new Date().getTime() / MS;
        await Online.update({ lastTime: seconds }, {
            where: {
                idUser: phoneEmail
            }
        });
        const newToken = tokenCreator.newTokenCreater(phoneEmail)

        await User.update({ token: newToken }, {
            where: {
                phoneEmail: phoneEmail
            }
        });

        return newToken
    }
    return ("login error")
}

export default login