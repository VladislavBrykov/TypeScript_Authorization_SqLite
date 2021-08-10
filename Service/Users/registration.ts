import Online from '../../Models/online.model'
import User from '../../Models/user.model'

import ResTypeid from './type.id'
import token from './new.token'

async function registration(phoneEmail: string, password: string): Promise<boolean> {
    const typeId: string = ResTypeid(password)
    const newToken: string = token.newTokenCreater(phoneEmail)

    const registrationUser = {
        phoneEmail,
        password,
        token: newToken,
        typeId
    }
    const searchUser = await User.findOne({ where: { phoneEmail: phoneEmail } })
    if (searchUser)
        return false
    else {
        const createOnline = {
            idUser: phoneEmail,
            lastTime: Date.now(),
        }

        await User.create(registrationUser);
        await Online.create(createOnline);

        return true
    }
}

// module.exports = {
//     registration
// }

export default registration