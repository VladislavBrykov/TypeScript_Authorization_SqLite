async function logout(token: string, all: string) {
    const User = require('../../Models/User.model');
    let res = await User.findOne({ where: { token: token } })
    if (res) {
        if (!all) {
            User.update({ token: "0" }, {
                where: {
                    token: token
                }
            })
        }
        if (all) {
            User.update({ token: "0" }, {
                where: {}
            })
        }
        return (true)
    }
    else
        return false
}

module.exports = {
    logout: logout
}