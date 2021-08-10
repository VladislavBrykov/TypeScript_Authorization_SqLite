import { Request, Response, NextFunction } from "express";
import LatencyMonitor from "latency-monitor";

const sequelize = require("../../Config/database");
const User = require("../../Models/User.model");
const Online = require("../../Models/Online.model");
const resultRegistration = require("../../Service/Users/registration");
const resultLogin = require("../../Service/Users/login");
const resultInfouser = require("../../Service/Users/users.info");
const resultLogout = require("../../Service/Users/logout");
const resultUpdatetime = require("../../Service/Users/update.time");

sequelize.sync({ force: true }).then(() => console.log("db is ready"));

const newUser: any = async (req: Request, res: Response, next: NextFunction) => {
    const { password, phoneEmail } = req.body;
    const resRegistration: boolean = await resultRegistration.registration(phoneEmail, password);

    if (resRegistration) {
        return res.status(200).json({ status: "registration successful" });
    } else {
        return res.status(404).json({ status: "registration error^ user exists" });
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { password, phoneEmail } = req.body;
    const resLogin = await resultLogin.login(phoneEmail, password)

    if (resLogin.length > 10)
        res.status(200).json({ login: "success", resLogin });
    else
        res.status(200).json({ status: "login error" });
};

const infoUser = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.authorization;
    const resInfiuser: object = await resultInfouser.infouser(token)

    if (resInfiuser) {
        return res.status(200).json({ status: true, resInfiuser });
    } else {
        return res.status(200).json({ status: "infouser error" });
    }
};

const logout: any = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.authorization;
    const all: string | string[] = req.headers.all;

    const resLogout: boolean = await resultLogout.logout(token, all)

    if (resLogout) {
        res.status(200).json({ status: true });
    } else {
        res.status(200).json({ status: "token error" });
    }
};

const latency: any = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.authorization;
    const resLatency: boolean = await resultUpdatetime.updateTime(token)

    if (resLatency) {
        const monitor: any = await new LatencyMonitor();
        const time: number = await monitor.latencyCheckIntervalMs;
        return res.status(200).json({ time });
    }
    else {
        res.status(200).json({ status: "infouser error" });
    }
};

export default { newUser, login, logout, infoUser, latency };
