/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import LatencyMonitor from 'latency-monitor';

const sequelize: any = require('../Database/database');
const User:any = require('../Database/User.model');
const Online:any = require('../Database/Online.model');

sequelize.sync({ force: true }).then(() => console.log('db is ready'));

//registration
const newUser:any = async (req: Request, res: Response, next: NextFunction) => {
    let phone_email: string = req.body.phone_email;
    let password: string = req.body.password;

	new Promise((resolve, reject) => {   
        const result:any = require('../Servece/registration')
        result.registration(phone_email, password)
    
        .then(response => {
            if (response) {
                return res.status(200).json({
                    "status": "registration successful"
                });
            } else {
                reject(0)
            }
        })
    }).catch(() => {
        return res.status(404).json({
            "status": "registration error^ user exists"
        });
    })
};

// //login
const login:any = async (req: Request, res: Response, next: NextFunction) => {
    let phone_email: string = req.body.phone_email;
    let password: string = req.body.password;

	new Promise((resolve, reject) => {   
        const result:any = require('../Servece/login')
        result.login(phone_email, password)

        .then(response => {
            if (response) {
                resolve(response);
            } else {
                reject(0)
            }
        })
    }).then(rp => {       
        res.status(200).json({
            "login": "success", rp
        });
	}).catch(() => {
        res.status(200).json({
            "status": "login error"
        });
	})
};


// //infouser
const infoUser:any = async (req: Request, res: Response, next: NextFunction) => {
    let token:string = req.headers.authorization;

	new Promise((resolve, reject) => {   
        const result:any = require('../Servece/infoUser')
        result.infouser(token)
        
        .then(response => {
            if (response) {
                resolve(response);
            } else {
                reject(0)
            }
        })
    }).then(rp => {
        res.status(200).json({
            status: true, rp
        });
	}).catch(() => {
        res.status(200).json({
            "status": "infouser error"
        });
	})
};


// //logout
const logout:any = async (req: Request, res: Response, next: NextFunction) => {
    let token:string = req.headers.authorization
    let all: string | string[] = req.headers.all

    new Promise((resolve, reject) => {   
        const result:any = require('../Servece/logout')
        result.logout(token, all)
        
        .then(response => {
            if (response) {
                resolve(response);
            } else {
                reject(0)
            }
        })
    }).then(rp => {
        res.status(200).json({
        status: true
        });
    }).catch(() => {
        res.status(200).json({
            "status": "token error"
        });
    })
};


//latency
const latency:any = async (req: Request, res: Response, next: NextFunction) => {
    let token:string = req.headers.authorization
    console.log(token);

    new Promise((resolve, reject) => {   
        const result:any = require('../Servece/updateTime')
        result.updateTime(token)
        
        .then(response => {
            if (response) {
                resolve(response);
            } else {
                reject(0)
            }
        })

    }).then(rp => {
        const monitor:any = new LatencyMonitor();
        let time:number = monitor.latencyCheckIntervalMs

        return res.status(200).json({
            "latency": time
        });
    }).catch(() => {
        res.status(200).json({
            "status": "infouser error"
        });
    })
};

export default { newUser, login, logout, infoUser, latency };