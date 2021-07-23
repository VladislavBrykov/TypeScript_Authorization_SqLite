function registration(phone_email: string, password: string) {
    const User = require('../Database/User.model');
    const Online = require('../Database/Online.model');
    
    return new Promise((resolve, reject) => {
        
        function typeId(pass:string):string {
            let res:RegExpMatchArray = pass.match(/\S/g);
            let num:number = res.indexOf("@")
            if(num>0)
                return "emal"
            if(num<0)
                return "mobile"
        }

        let type_id:string = typeId(password)
        console.log(type_id);
        
        let token:any = require('./newToken')
        let newToken:string = token.newToken()

        let sqlite = {
            "id_user": phone_email,
            "lastTime": "seconds",
        }
        Online.create(sqlite);

        let sqlite_2 = {
            "phone_email": phone_email,
            "password": password,
            "token": newToken,
            "type_id": type_id
        }

        User.findOne({where: {phone_email: phone_email}})
        .then(user=>{
            if(!user) {
                User.create(sqlite_2);
                resolve(true)
            }
            resolve(false)
        }).catch(err=>console.log(err));
    })
}

module.exports = {
    registration:  registration
}