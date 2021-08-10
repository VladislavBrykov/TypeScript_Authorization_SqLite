import User from '../../Models/user.model'
import tokenService from './new.token'

async function userWithUpdatedToken(token: string) {
    const { tokenValidator, newTokenCreater } = tokenService
    const data = tokenValidator(token)

    if (!data) {
        return false
    }

    const newToken = newTokenCreater(data.phoneEmail)
    const searchUser = await User.findOne({ where: { phoneEmail: data.phoneEmail } })

    if (!searchUser) {
        return false
    }

    await searchUser.update({ token: newToken }, {
        where: {
            phoneEmail: data.phoneEmail
        }
    });
    return searchUser
}


export default userWithUpdatedToken