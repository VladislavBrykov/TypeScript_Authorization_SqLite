import express from 'express';
import controller from './user.controller';
import { asyncFunctionWrapper } from '../../Helpers/asyncFunctionWrapper'

const router = express.Router();

router.post('/login', asyncFunctionWrapper(controller.login));
router.get('/info', asyncFunctionWrapper(controller.infoUser));
router.get('/logout', controller.logout);
router.get('/latency', controller.latency);
router.post('/registration', controller.newUser);

export default router