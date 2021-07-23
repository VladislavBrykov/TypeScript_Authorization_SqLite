function logout(token, all) {
    const User = require('../Database/User.model');
    return new Promise((resolve, reject) => {
        User.findOne({ where: { token: token } })
            .then(user => {
            if (!user)
                resolve(false);
            else {
                if (!all) {
                    User.update({ token: "0" }, {
                        where: {
                            token: token
                        }
                    });
                }
                if (all) {
                    User.update({ token: "0" }, {
                        where: {}
                    });
                }
                resolve(true);
            }
        }).catch(err => console.log(err));
    });
}
module.exports = {
    logout: logout
};
//# sourceMappingURL=logout.js.map