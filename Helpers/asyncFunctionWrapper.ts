export const asyncFunctionWrapper = (callBack) => async (req, res, next) => {
    try {
        await callBack(req, res)
    } catch (error) {
        res.status(500).send("server error")
    }
}