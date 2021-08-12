import UserDevice from '../../../Models/users.device'
import User from '../../../Models/user.model'
import tokenService from './new.token'

async function userWithUpdatedToken(token: string) {
    const { tokenValidator, newTokenCreater } = tokenService
    const data = tokenValidator(token)
    const newToken = newTokenCreater(data.phoneEmail)
    const searchUser = await UserDevice.findOne({ where: { token: token } })

    if (searchUser) {
        function updateObject(nameObject) {
            nameObject.update({ token: newToken }, {
                where: {
                    phoneEmail: data.phoneEmail
                }
            });
        }
        await updateObject(searchUser);
        await updateObject(UserDevice);
        return searchUser
    }
    return false
}

async function searchUserService(token: string) {
    const searchUser = await UserDevice.findOne({ where: { token: token } })
    return (searchUser ? searchUser : false)
}

async function searchUserTable(phoneEmail: string) {
    const searchUser = await User.findOne({ where: { phoneEmail: phoneEmail } })
    return (searchUser ? searchUser : false)
}

const functionHelpers = {
    searchUserService,
    userWithUpdatedToken,
    searchUserTable,
}

export default functionHelpers
