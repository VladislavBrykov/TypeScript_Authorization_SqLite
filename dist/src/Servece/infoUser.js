function infouser(token) {
    const User = require('../Database/User.model');
    const Online = require('../Database/Online.model');
    return new Promise((resolve, reject) => {
        User.findOne({ where: { token: token } })
            .then(user => {
            if (!user)
                resolve(false);
            else {
                let seconds = new Date().getTime() / 1000;
                Online.update({ lastTime: seconds }, {
                    where: {
                        id_user: user.phone_email
                    }
                }).then((res) => {
                    console.log(res);
                });
                let informationUser = {
                    id: user.phone_email,
                    typeId: user.type_id
                };
                resolve(informationUser);
            }
        }).catch(err => console.log(err));
    });
}
module.exports = {
    infouser: infouser
};
//# sourceMappingURL=infoUser.js.map