function login(phone_email: string, password: string) {
    const User = require('../Database/User.model');
    const Online = require('../Database/Online.model');

    return new Promise((resolve, reject) => {
        
        User.findOne({where: {phone_email: phone_email, password: password}})
        .then(user=>{
            if(!user) resolve(false)
            else {
                let seconds:number = new Date().getTime() / 1000;

                Online.update({ lastTime: seconds }, {
                    where: {
                        id_user: phone_email
                    }
                  }).then((res) => {
                    console.log(res);
                  });

                  let token:any = require('./newToken')
                  let newToken:string = token.newToken()

                  User.update({ token: newToken }, {
                    where: {
                        phone_email: phone_email
                    }
                  }).then((res) => {
                    console.log(res);
                  });

                  async function func() {
                      const status_online:any = require('./logoutTime');
                      await status_online.logoutTime(phone_email, newToken)
                  }
                  setInterval(func, 600000) //время жизни токена 10 min, после чего юзера вылогинивает если он бездействует

                resolve(newToken)
            }
        }).catch(err=>console.log(err));
    })
}

module.exports = {
    login:  login
}