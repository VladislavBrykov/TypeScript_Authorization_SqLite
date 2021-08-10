async function logout(token: string, all: string) {
    const User = require('../../Models/user.model');
    const searchUser = await User.findOne({ where: { token: token } })

    if (searchUser) {
        if (!all) {
            User.update({ token: "0" }, {
                where: {
                    token: token
                }
            })
        } else {
            User.update({ token: "0" }, {
                where: {}
            })
        }
        return true
    }
    else
        return false
}

module.exports = {
    logout: logout
}