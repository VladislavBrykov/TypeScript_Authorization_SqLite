import { Request, Response, NextFunction } from 'express';
import LatencyMonitor from 'latency-monitor';
import { injectable, inject } from 'inversify';
import sequelize from '../../Config/database';
import { TYPES } from '../../types';
import UserService from '../../Service/Users/users.servece.data';
import 'reflect-metadata';

const monitor = new LatencyMonitor();
const time: number = monitor.latencyCheckIntervalMs;
sequelize.sync({ force: true }).then(() => console.log('db is ready'));

@injectable()
class UserController {
private _userService: UserService;

constructor(@inject(TYPES.Users) userService: UserService) {
  this._userService = userService;
}

    registration = async (req: Request, res: Response) => {
      const { password, phoneEmail } = req.body;
      const resRegistration: any = await this._userService.serviceRegistration(
        phoneEmail,
        password,
      );
      return resRegistration
        ? res.status(200).json({ status: 'registration successful' })
        : res.status(404).json({ status: 'registration error, user exists' });
    };

    login = async (req: Request, res: Response) => {
      const { password, phoneEmail } = req.body;
      const resLogin = await this._userService.serviceLogin(phoneEmail, password);

      return resLogin
        ? res.status(200).json({ login: 'success', resLogin })
        : res.status(200).json({ status: 'Invalid username or password' });
    };

    // infoUser = async (req: Request, res: Response) => {
    //     const token: string = req.headers.authorization;
    //     const resInfiuser: object = await this._userService.serviceInfouser(token);
    //     return resInfiuser ?
    //         res.status(200).json({ status: true, resInfiuser }) :
    //         res.status(200).json({ status: 'infouser error' });
    // };

    // latency = async (req: Request, res: Response) => {
    //     const token: string = req.headers.authorization;
    //     const searchUser = await functionHelpers.searchUserService(token);
    //     const resLatency = await functionHelpers.userWithUpdatedToken(token);
    //     return (resLatency && searchUser) ?
    //         res.status(200).json({ time, token: resLatency.token }) :
    //         res.status(200).json({ status: 'latency error' })
    // }

    logout = async (req: Request, res: Response) => {
      const token: string = req.headers.authorization;
      const { all } = req.query;
      const resLogout: boolean = await this._userService.serviceLogout(token, all);
      return resLogout
        ? res.status(200).json({ status: true })
        : res.status(404).json({ status: 'token error' });
    };

    deleteUser = async (req: Request, res: Response) => {
      const token: string = req.headers.authorization;
      const resLogout: boolean = await this._userService.serviceDeleteUser(token);
      return resLogout
        ? res.status(200).json({ status: true })
        : res.status(404).json({ status: 'token error' });
    };

    passwordUpdate = async (req: Request, res: Response) => {
      const { password, phoneEmail, newPassword } = req.body;
      const token: string = req.headers.authorization;
      const resLogin = await this._userService.servicePasswordUpdate(
        phoneEmail,
        password,
        newPassword,
        token,
      );
      return resLogin.length > 10
        ? res.status(200).json({ login: 'success', resLogin })
        : res.status(200).json({ status: 'login error' });
    };
}

export default UserController;
