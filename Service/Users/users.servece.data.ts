import { injectable, inject } from 'inversify';
import User from '../../Models/user.model';
import UserDevice from '../../Models/users.device';
import tokenCreator from './utils/new.token';
import ResTypeid from './utils/type.id';
import { Users } from '../../interfaces';

@injectable()
class UserService implements Users {
  constructor() { }

  async serviceLogin(phoneEmail: string, password: string) {
    const searchUser = await User.findOne({ where: { phoneEmail, password } });

    if (searchUser) {
      const newToken = await tokenCreator.newTokenCreater(phoneEmail);
      const newDevice = {
        phoneEmail,
        token: newToken,
      };
      await UserDevice.create(newDevice);
      return newToken;
    }
    return (false);
  }

  async serviceRegistration(phoneEmail: string, password: string) {
    const typeId: string = await ResTypeid(phoneEmail);
    // eslint-disable-next-line no-undef
    const newToken: string = await tokenCreator.newTokenCreater(phoneEmail);

    const registrationUser = {
      phoneEmail,
      password,
      token: newToken,
      typeId,
    };
    const searchUser = await User.findOne({ where: { phoneEmail } });
    if (searchUser) return false;

    await User.create(registrationUser);
    return true;
  }

  async serviceLogout(token: string, all:any) {
    const searchUser = await UserDevice.findOne({ where: { token } });

    if (all === 'true') {
      await UserDevice.update({ token: null }, { where: { token } });
    } else {
      await UserDevice.update(
        { token: null },
        { where: { phoneEmail: searchUser.phoneEmail } },
      );
    }
    return true;
  }

  async serviceDeleteUser(token: string) {
    const searchUser = await UserDevice.findOne({ where: { token } });

    if (searchUser) {
      await UserDevice.destroy({ where: { phoneEmail: searchUser.phoneEmail } });
      await User.destroy({ where: { phoneEmail: searchUser.phoneEmail } });

      return true;
    }

    return false;
  }

  async servicePasswordUpdate(
    phoneEmail: string,
    password: string,
    newPassword: string,
    token: string,
  ) {
    const searchUser = User.findOne({ where: { phoneEmail, password } });

    if (searchUser) {
      const newToken = await tokenCreator.newTokenCreater(phoneEmail);
      await User.update({ password: newPassword }, { where: { phoneEmail } });
      await UserDevice.update({ token: newToken }, { where: { token } });

      return newToken;
    }
    return ('password update error');
  }
}

export default UserService;
