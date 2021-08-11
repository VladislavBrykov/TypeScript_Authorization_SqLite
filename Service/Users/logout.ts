import User from '../../Models/user.model'

async function logout(token: string, all: string | string[]) {
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

export default logout