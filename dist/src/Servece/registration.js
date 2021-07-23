function registration(phone_email, password) {
    const User = require('../Database/User.model');
    const Online = require('../Database/Online.model');
    return new Promise((resolve, reject) => {
        function typeId(pass) {
            let res = pass.match(/\S/g);
            let num = res.indexOf("@");
            if (num > 0)
                return "emal";
            if (num < 0)
                return "mobile";
        }
        let type_id = typeId(password);
        console.log(type_id);
        let token = require('./newToken');
        let newToken = token.newToken();
        let sqlite = {
            "id_user": phone_email,
            "lastTime": "seconds",
        };
        Online.create(sqlite);
        let sqlite_2 = {
            "phone_email": phone_email,
            "password": password,
            "token": newToken,
            "type_id": type_id
        };
        User.findOne({ where: { phone_email: phone_email } })
            .then(user => {
            if (!user) {
                User.create(sqlite_2);
                resolve(true);
            }
            resolve(false);
        }).catch(err => console.log(err));
    });
}
module.exports = {
    registration: registration
};
//# sourceMappingURL=registration.js.map