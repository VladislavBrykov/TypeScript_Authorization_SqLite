import Online from '../../Models/online.model'
import User from '../../Models/user.model'

export default async function logoutTime(phoneEmail: string, newToken: string) {
    const searchUser = await Online.findOne({ where: { id_user: phoneEmail } })

    if (searchUser) {
        console.log(searchUser);

        const MS = 1000;
        const tenMin = 600;
        const seconds: number = new Date().getTime() / MS;
        if ((seconds - searchUser.lastTime) > tenMin) {
            User.update({ token: "0" }, {
                where: {
                    token: newToken
                }
            })
            return true
        }
    }
    else
        return false
}
