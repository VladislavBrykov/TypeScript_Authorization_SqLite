import User from '../../Models/user.model';
import UserDevice from '../../Models/users.device';
import tokenCreator from './utils/new.token';
import ResTypeid from './utils/type.id';
import token from './utils/new.token';
import functionHelpers from './utils/user.service.helpers';
import Users from '../../interfaces'
import { injectable, inject } from "inversify";

@injectable()
class UserService implements Users {
    constructor() { }

    async serviceLogin(phoneEmail: string, password: string) {
        const searchUser = User.findOne({ where: { phoneEmail: phoneEmail, password: password } });

        if (searchUser) {
            const newToken = await tokenCreator.newTokenCreater(phoneEmail);
            const newDevice = {
                phoneEmail,
                token: newToken,
            }
            await UserDevice.create(newDevice);
            return newToken;
        }
        return ('login error');
    }

    async serviceRegistration(phoneEmail: string, password: string) {
        const typeId: string = await ResTypeid(phoneEmail);
        const newToken: string = await token.newTokenCreater(phoneEmail);

        const registrationUser = {
            phoneEmail,
            password,
            token: newToken,
            typeId,
        }
        const searchUser = await User.findOne({ where: { phoneEmail: phoneEmail } })
        if (searchUser)
            return false;
        else {
            await User.create(registrationUser);
            return true;
        }
    }

    async serviceLogout(token: string, all) {
        const searchUser = await UserDevice.findOne({ where: { token: token } });

        if (searchUser) {
            all === 'true' ?
                await UserDevice.update({ token: null }, { where: { token: token } }) :
                await UserDevice.update({ token: null }, { where: { phoneEmail: searchUser.phoneEmail } });
            return true;
        }
        else {
            return false;
        }
    }

    async serviceInfouser(token: string) {
        const searchUserDvice = await functionHelpers.userWithUpdatedToken(token);
        if (!searchUserDvice) {
            return { error: 'user not found' };
        }
        const searchUserUniquer = await functionHelpers.searchUserTable(searchUserDvice.phoneEmail);
        if (!searchUserUniquer) {
            return { error: 'user not found' };
        }
        const informationUser = {
            id: searchUserDvice.phoneEmail,
            typeId: searchUserUniquer.typeId,
            token: searchUserDvice.token,
        }
        return (informationUser);
    }
}

export default UserService
