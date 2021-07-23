var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function login(phone_email, password) {
    const User = require('../Database/User.model');
    const Online = require('../Database/Online.model');
    return new Promise((resolve, reject) => {
        User.findOne({ where: { phone_email: phone_email, password: password } })
            .then(user => {
            if (!user)
                resolve(false);
            else {
                let seconds = new Date().getTime() / 1000;
                Online.update({ lastTime: seconds }, {
                    where: {
                        id_user: phone_email
                    }
                }).then((res) => {
                    console.log(res);
                });
                let token = require('./newToken');
                let newToken = token.newToken();
                User.update({ token: newToken }, {
                    where: {
                        phone_email: phone_email
                    }
                }).then((res) => {
                    console.log(res);
                });
                function func() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const status_online = require('./logoutTime');
                        yield status_online.logoutTime(phone_email, newToken);
                    });
                }
                setInterval(func, 600000); //время жизни токена 10 min, после чего юзера вылогинивает если он бездействует
                resolve(newToken);
            }
        }).catch(err => console.log(err));
    });
}
module.exports = {
    login: login
};
//# sourceMappingURL=login.js.map