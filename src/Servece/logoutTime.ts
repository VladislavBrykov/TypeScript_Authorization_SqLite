async function logoutTime(phone_email: string, newToken: string) {
    const Online = require('../Database/Online.model');
    const User = require('../Database/User.model');

    return new Promise((resolve, reject) => {
        Online.findOne({where: {id_user: phone_email}})
        .then(user=>{
            if(!user) console.log("error logoutTime user");
            else {                
                let seconds:number = new Date().getTime() / 1000;
                if((seconds - user.lastTime) > 600) {   
                    User.update({ token: "0" }, {
                        where: {
                            token: newToken
                        }
                    })
                    resolve(true)
                }
                resolve(false)
            }
        }).catch(err=>console.log(err));
    })
}

module.exports = {
    logoutTime:  logoutTime
}
