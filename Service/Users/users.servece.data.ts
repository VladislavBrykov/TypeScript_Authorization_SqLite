import User from '../../Models/user.model'
import tokenCreator from './utils/new.token'
import ResTypeid from './utils/type.id'
import token from './utils/new.token'
import functionHelpers from './utils/service.user.token'

async function serviceLogin(phoneEmail: string, password: string) {
    const searchUser = await User.findOne({ where: { phoneEmail: phoneEmail, password: password } })

    if (searchUser) {
        const MS = 1000;
        const seconds: number = new Date().getTime() / MS;
        const newToken = tokenCreator.newTokenCreater(phoneEmail)

        await User.update({ token: newToken }, {
            where: {
                phoneEmail: phoneEmail
            }
        });
        return newToken
    }

    return ('login error')
}

async function serviceRegistration(phoneEmail: string, password: string): Promise<boolean> {
    const typeId: string = ResTypeid(phoneEmail)
    const newToken: string = token.newTokenCreater(phoneEmail)

    const registrationUser = {
        phoneEmail,
        password,
        token: newToken,
        typeId
    }
    const searchUser = await User.findOne({ where: { phoneEmail: phoneEmail } })
    if (searchUser)
        return false
    else {
        await User.create(registrationUser);
        return true
    }
}

async function serviceLogout(token: string, all: boolean) {
    const searchUser = await User.findOne({ where: { token: token } })

    if (searchUser) {
        all ? User.update({ token: "0" }, { where: { token: token } }) : User.update({ token: "0" }, { where: {} })
        return true
    }
    else {
        return false
    }
}

async function serviceInfouser(token: string) {
    const searchUser = await functionHelpers.userWithUpdatedToken(token)

    if (!searchUser) {
        return { error: 'user not found' }
    }

    const informationUser = {
        id: searchUser.phoneEmail,
        typeId: searchUser.typeId,
        token: searchUser.token
    }
    return (informationUser)
}

const userControllerData = {
    serviceLogin,
    serviceRegistration,
    serviceLogout,
    serviceInfouser,
}

export default userControllerData