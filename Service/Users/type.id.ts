function typeId(pass: string): string {
    const arrayPass: RegExpMatchArray = pass.match(/\S/g);
    const searchnum: number = arrayPass.indexOf("@")

    if (searchnum > 0) {
        return "emal"
    }
    else {
        return "mobile"
    }
}

module.exports = {
    typeId: typeId
}