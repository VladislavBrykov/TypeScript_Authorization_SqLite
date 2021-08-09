/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from "express";
import LatencyMonitor from "latency-monitor";

const sequelize: any = require("../../Config/database");
const User: any = require("../../Models/User.model");
const Online: any = require("../../Models/Online.model");

sequelize.sync({ force: true }).then(() => console.log("db is ready"));

//registration
const newUser: any = async (req: Request, res: Response, next: NextFunction) => {
    let phone_email: string = req.body.phone_email;
    let password: string = req.body.password;

    const result: any = require("../../Service/Users/registration");
    let resRegistration = await result.registration(phone_email, password);

    if (resRegistration)
        return res.status(200).json({ status: "registration successful" });
    else
        return res.status(404).json({ status: "registration error^ user exists" });
};

// //login
const login: any = async (req: Request, res: Response, next: NextFunction) => {
    let phone_email: string = req.body.phone_email;
    let password: string = req.body.password;

    const result: any = require("../../Service/Users/login");
    let resLogin = await result.login(phone_email, password)

    if (resLogin)
        res.status(200).json({ login: "success", resLogin });
    else
        res.status(200).json({ status: "login error" });
};

// //infouser
const infoUser: any = async (req: Request, res: Response, next: NextFunction) => {
    let token: string = req.headers.authorization;
    const result: any = require("../../Service/Users/infoUser");

    let resInfiuser = await result.infouser(token)

    if (resInfiuser)
        return res.status(200).json({ status: true, resInfiuser });
    else
        return res.status(200).json({ status: "infouser error" });
};

// //logout
const logout: any = async (req: Request, res: Response, next: NextFunction) => {
    let token: string = req.headers.authorization;
    let all: string | string[] = req.headers.all;

    const result: any = require("../../Service/Users/logout");
    let resLogout = await result.logout(token, all)

    if (resLogout)
        res.status(200).json({ status: true });
    else
        res.status(200).json({ status: "token error" });
};

//latency
const latency: any = async (req: Request, res: Response, next: NextFunction) => {
    let token: string = req.headers.authorization;
    console.log(token);

    const result: any = require("../../Service/Users/updateTime");
    let resLatency = await result.updateTime(token)

    if (resLatency) {
        const monitor: any = await new LatencyMonitor();
        let time: number = await monitor.latencyCheckIntervalMs;
        return res.status(200).json({ latency: time });
    }
    else
        res.status(200).json({ status: "infouser error" });
};

export default { newUser, login, logout, infoUser, latency };
