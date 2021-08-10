import userWithUpdatedToken from './update.user.token'

async function infouser(token: string) {
    const searchUser = await userWithUpdatedToken(token)

    if (!searchUser) {
        return { error: "user not found" }
    }

    const informationUser = {
        id: searchUser.phoneEmail,
        typeId: searchUser.typeId,
        token: searchUser.token
    }
    return (informationUser)
}

export default infouser