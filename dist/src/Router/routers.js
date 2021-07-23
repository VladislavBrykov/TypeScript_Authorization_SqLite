"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const router = express_1.default.Router();
router.post('/login', controller_1.default.login);
router.get('/info', controller_1.default.infoUser);
router.get('/logout', controller_1.default.logout);
router.get('/latency', controller_1.default.latency);
router.post('/registration', controller_1.default.newUser);
module.exports = router;
//# sourceMappingURL=routers.js.map