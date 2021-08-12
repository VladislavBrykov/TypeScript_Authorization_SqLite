import { Request, Response, NextFunction } from 'express';
import sequelize from "../../Config/database";
import functionHelpers from '../../Service/Users/utils/user.service.helpers'
import userControllerData from '../../Service/Users/users.servece.data'
import LatencyMonitor from 'latency-monitor';

const monitor = new LatencyMonitor();
const time: number = monitor.latencyCheckIntervalMs;
sequelize.sync({ force: true }).then(() => console.log('db is ready'));

const registration = async (req: Request, res: Response) => {
    const { password, phoneEmail } = req.body;
    const resRegistration: boolean = await userControllerData.serviceRegistration(phoneEmail, password);
    return (resRegistration ? res.status(200).json({ status: 'registration successful' }) : res.status(404).json({ status: 'registration error, user exists' }))
};

const login = async (req: Request, res: Response) => {
    const { password, phoneEmail } = req.body;
    const resLogin = await userControllerData.serviceLogin(phoneEmail, password)
    return (resLogin.length > 10 ? res.status(200).json({ login: 'success', resLogin }) : res.status(200).json({ status: 'login error' }));
};

const infoUser = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.authorization;
    const resInfiuser: object = await userControllerData.serviceInfouser(token)
    return (resInfiuser ? res.status(200).json({ status: true, resInfiuser }) : res.status(200).json({ status: 'infouser error' }))
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.authorization;
    let all = true;
    req.url.indexOf('true') >= 0 ? all : all = null
    const resLogout: boolean = await userControllerData.serviceLogout(token, all)
    return (resLogout ? res.status(200).json({ status: true }) : res.status(200).json({ status: 'token error' }))
};

const latency = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.authorization;
    const searchUser = await functionHelpers.searchUserService(token)
    const resLatency = await functionHelpers.userWithUpdatedToken(token)
    return ((resLatency && searchUser) ? res.status(200).json({ time, token: resLatency.token }) : res.status(200).json({ status: 'latency error' }))
};

export default { registration, login, logout, infoUser, latency };
