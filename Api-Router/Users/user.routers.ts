import express from 'express';
import controller from './user.controller';
import { asyncFunctionWrapper } from '../../Helpers/async.function.wrapper';

const router = express.Router();

router.post('/login', asyncFunctionWrapper(controller.login));
router.get('/info', asyncFunctionWrapper(controller.infoUser));
router.get('/logout', asyncFunctionWrapper(controller.logout));
router.get('/latency', asyncFunctionWrapper(controller.latency));
router.post('/registration', asyncFunctionWrapper(controller.registration));

module.exports = router;
