import UserDevice from '../../../Models/users.device';
import User from '../../../Models/user.model';
import tokenService from './new.token';

function updateTokenUserById(nameObject, newToken, data) {
    nameObject.update({ token: newToken }, {
        where: {
            phoneEmail: data.phoneEmail
        }
    });
    return true;
}

async function userWithUpdatedToken(token: string) {
    const { tokenValidator, newTokenCreater } = tokenService;
    const data = tokenValidator(token);
    const newToken = newTokenCreater(data.phoneEmail);
    const searchUser = await UserDevice.findOne({ where: { token: token } });

    if (searchUser) {
        await Promise.all([updateTokenUserById(searchUser, newToken, data), updateTokenUserById(UserDevice, newToken, data)]);
        return searchUser;
    }
    return false;
}

async function searchUserService(token: string) {
    const searchUser = await UserDevice.findOne({ where: { token: token } })
    return (searchUser ? searchUser : false);
}

async function searchUserTable(phoneEmail: string) {
    const searchUser = await User.findOne({ where: { phoneEmail: phoneEmail } })
    return (searchUser ? searchUser : false);
}

const functionHelpers = {
    searchUserService,
    userWithUpdatedToken,
    searchUserTable,
}

export default functionHelpers;
