function newToken() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 100; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
module.exports = {
    newToken: newToken
};
//# sourceMappingURL=newToken.js.map