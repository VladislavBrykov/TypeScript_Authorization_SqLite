import * as jwt from 'jsonwebtoken'
import constants from '../../../Helpers/constants';

function newTokenCreater(phoneEmail): string {
    return jwt.sign({
        exp: Math.floor(Date.now() / constants.ms) + constants.tenMin, phoneEmail
    }, constants.secreKey)
}

function tokenValidator(token) {
    try {
        const data = jwt.verify(token, constants.secreKey)
        return data
    } catch (error) {
        return null
    }
}

export default { newTokenCreater, tokenValidator }