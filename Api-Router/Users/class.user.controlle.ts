import { Request, Response, NextFunction } from 'express';
import sequelize from "../../Config/database";
import functionHelpers from '../../Service/Users/utils/user.service.helpers';
import classUserServices from '../../Service/Users/users.servece.data';
import LatencyMonitor from 'latency-monitor';
import { TYPES } from "../../types";
import { injectable, inject } from "inversify";
import UserService from '../../Service/Users/users.servece.data';
import "reflect-metadata";

const monitor = new LatencyMonitor();
const time: number = monitor.latencyCheckIntervalMs;
sequelize.sync({ force: true }).then(() => console.log('db is ready'));

@injectable()
class UserController {

    @inject(TYPES.Users) private userService: UserService;

    registration = async (req: Request, res: Response) => {
        const { password, phoneEmail } = req.body;
        const resRegistration: boolean = await this.userService.serviceRegistration(phoneEmail, password);
        return resRegistration ?
            res.status(200).json({ status: 'registration successful' }) :
            res.status(404).json({ status: 'registration error, user exists' });
    };

    login = async (req: Request, res: Response) => {
        const { password, phoneEmail } = req.body;
        const resLogin = await this.userService.serviceLogin(phoneEmail, password);
        return resLogin.length > 10 ?
            res.status(200).json({ login: 'success', resLogin }) :
            res.status(200).json({ status: 'login error' });
    };

    infoUser = async (req: Request, res: Response) => {
        const token: string = req.headers.authorization;
        const resInfiuser: object = await this.userService.serviceInfouser(token);
        return resInfiuser ?
            res.status(200).json({ status: true, resInfiuser }) :
            res.status(200).json({ status: 'infouser error' });
    };

    latency = async (req: Request, res: Response) => {
        const token: string = req.headers.authorization;
        const searchUser = await functionHelpers.searchUserService(token);
        const resLatency = await functionHelpers.userWithUpdatedToken(token);
        return (resLatency && searchUser) ?
            res.status(200).json({ time, token: resLatency.token }) :
            res.status(200).json({ status: 'latency error' })
    }

    logout = async (req: Request, res: Response) => {
        const token: string = req.headers.authorization;
        const all = req.query.all;
        const resLogout: boolean = await this.userService.serviceLogout(token, all);
        return resLogout ?
            res.status(200).json({ status: true }) :
            res.status(404).json({ status: 'token error' });
    };
}

export default UserController