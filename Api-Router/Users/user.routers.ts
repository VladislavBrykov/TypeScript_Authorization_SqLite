import express from 'express';
import { asyncFunctionWrapper } from '../../Helpers/async.function.wrapper';
import UserController from './class.user.controlle';

const router = express.Router();
const classUserController = new UserController();

router.post('/login', asyncFunctionWrapper(classUserController.login));
router.get('/info', asyncFunctionWrapper(classUserController.infoUser));
router.get('/logout', asyncFunctionWrapper(classUserController.logout));
router.get('/latency', asyncFunctionWrapper(classUserController.latency));
router.post('/registration', asyncFunctionWrapper(classUserController.registration));

module.exports = router
