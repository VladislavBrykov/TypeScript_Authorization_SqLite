function typeId(pass: string): string {
    let res: RegExpMatchArray = pass.match(/\S/g);
    let num: number = res.indexOf("@")
    if (num > 0)
        return "emal"
    if (num < 0)
        return "mobile"
}

module.exports = {
    typeId: typeId
}