function updateTime(token) {
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
                resolve(true);
            }
        }).catch(err => console.log(err));
    });
}
module.exports = {
    updateTime: updateTime
};
//# sourceMappingURL=updateTime.js.map