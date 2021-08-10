async function infouser(token: string) {
    const User: any = require('../../Models/User.model');
    const Online: any = require('../../Models/Online.model');


    let res = await User.findOne({ where: { token: token } })
    if (res) {
        let seconds: number = new Date().getTime() / 1000;

        Online.update({ lastTime: seconds }, {
            where: {
                id_user: res.phone_email
            }
        });

        let informationUser = {
            id: res.phone_email,
            typeId: res.type_id
        }
        return (informationUser)
    }
    else
        return false
}

module.exports = {
    infouser: infouser
}