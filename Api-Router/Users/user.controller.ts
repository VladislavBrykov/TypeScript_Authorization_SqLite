import { Request, Response, NextFunction } from "express";
import LatencyMonitor from "latency-monitor";
import sequelize from "../../Config/database";
import resultRegistration from '../../Service/Users/registration'
import resultLogin from '../../Service/Users/login'
import resultInfouser from '../../Service/Users/users.info'
import resultLogout from '../../Service/Users/logout'
import userWithUpdatedToken from '../../Service/Users/update.user.token'
import resultUpdatetime from '../../Service/Users/update.user.token'

sequelize.sync({ force: true }).then(() => console.log("db is ready"));

const newUser = async (req: Request, res: Response) => {
    const { password, phoneEmail } = req.body;
    const resRegistration: boolean = await resultRegistration(phoneEmail, password);

    if (resRegistration) {
        return res.status(200).json({ status: "registration successful" });
    } else {
        return res.status(404).json({ status: "registration error^ user exists" });
    }
};

const login = async (req: Request, res: Response) => {
    const { password, phoneEmail } = req.body;
    const resLogin = await resultLogin(phoneEmail, password)

    if (resLogin.length > 10)
        res.status(200).json({ login: "success", resLogin });
    else
        res.status(200).json({ status: "login error" });
};

const infoUser = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.authorization;
    const resInfiuser: object = await resultInfouser(token)

    if (resInfiuser) {
        return res.status(200).json({ status: true, resInfiuser });
    } else {
        return res.status(200).json({ status: "infouser error" });
    }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.authorization;
    const all: string | string[] = req.headers.all;

    const resLogout: boolean = await resultLogout(token, all)

    if (resLogout) {
        res.status(200).json({ status: true });
    } else {
        res.status(200).json({ status: "token error" });
    }
};

const latency = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.authorization;
    const resLatency = await resultUpdatetime(token)
    const searchUser = await userWithUpdatedToken(token)

    if (resLatency && searchUser) {
        const monitor = await new LatencyMonitor();
        const time: number = await monitor.latencyCheckIntervalMs;
        return res.status(200).json({ time, token: searchUser.token });
    }
    else {
        res.status(200).json({ status: "latency error" });
    }
};

export default { newUser, login, logout, infoUser, latency };
