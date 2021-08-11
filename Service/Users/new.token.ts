import * as jwt from 'jsonwebtoken'
const secreKey = '4444';

function newTokenCreater(phoneEmail): string {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 600, phoneEmail
    }, secreKey)

}

function tokenValidator(token) {
    try {
        const data = jwt.verify(token, secreKey)
        return data
    } catch (error) {
        return null
    }
}

export default { newTokenCreater, tokenValidator }