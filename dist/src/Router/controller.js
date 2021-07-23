"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const latency_monitor_1 = __importDefault(require("latency-monitor"));
const sequelize = require('../Database/database');
const User = require('../Database/User.model');
const Online = require('../Database/Online.model');
sequelize.sync({ force: true }).then(() => console.log('db is ready'));
//registration
const newUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let phone_email = req.body.phone_email;
    let password = req.body.password;
    new Promise((resolve, reject) => {
        const result = require('../Servece/registration');
        result.registration(phone_email, password)
            .then(response => {
            if (response) {
                return res.status(200).json({
                    "status": "registration successful"
                });
            }
            else {
                reject(0);
            }
        });
    }).catch(() => {
        return res.status(404).json({
            "status": "registration error^ user exists"
        });
    });
});
// //login
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let phone_email = req.body.phone_email;
    let password = req.body.password;
    new Promise((resolve, reject) => {
        const result = require('../Servece/login');
        result.login(phone_email, password)
            .then(response => {
            if (response) {
                resolve(response);
            }
            else {
                reject(0);
            }
        });
    }).then(rp => {
        res.status(200).json({
            "login": "success", rp
        });
    }).catch(() => {
        res.status(200).json({
            "status": "login error"
        });
    });
});
// //infouser
const infoUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    new Promise((resolve, reject) => {
        const result = require('../Servece/infoUser');
        result.infouser(token)
            .then(response => {
            if (response) {
                resolve(response);
            }
            else {
                reject(0);
            }
        });
    }).then(rp => {
        res.status(200).json({
            status: true, rp
        });
    }).catch(() => {
        res.status(200).json({
            "status": "infouser error"
        });
    });
});
// //logout
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    let all = req.headers.all;
    new Promise((resolve, reject) => {
        const result = require('../Servece/logout');
        result.logout(token, all)
            .then(response => {
            if (response) {
                resolve(response);
            }
            else {
                reject(0);
            }
        });
    }).then(rp => {
        res.status(200).json({
            status: true
        });
    }).catch(() => {
        res.status(200).json({
            "status": "token error"
        });
    });
});
//latency
const latency = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    console.log(token);
    new Promise((resolve, reject) => {
        const result = require('../Servece/updateTime');
        result.updateTime(token)
            .then(response => {
            if (response) {
                resolve(response);
            }
            else {
                reject(0);
            }
        });
    }).then(rp => {
        const monitor = new latency_monitor_1.default();
        let time = monitor.latencyCheckIntervalMs;
        return res.status(200).json({
            "latency": time
        });
    }).catch(() => {
        res.status(200).json({
            "status": "infouser error"
        });
    });
});
exports.default = { newUser, login, logout, infoUser, latency };
//# sourceMappingURL=controller.js.map