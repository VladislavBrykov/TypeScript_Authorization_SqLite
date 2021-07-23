var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function logoutTime(phone_email, newToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const Online = require('../Database/Online.model');
        const User = require('../Database/User.model');
        return new Promise((resolve, reject) => {
            Online.findOne({ where: { id_user: phone_email } })
                .then(user => {
                if (!user)
                    console.log("error logoutTime user");
                else {
                    let seconds = new Date().getTime() / 1000;
                    if ((seconds - user.lastTime) > 600) {
                        User.update({ token: "0" }, {
                            where: {
                                token: newToken
                            }
                        });
                        resolve(true);
                    }
                    resolve(false);
                }
            }).catch(err => console.log(err));
        });
    });
}
module.exports = {
    logoutTime: logoutTime
};
//# sourceMappingURL=logoutTime.js.map