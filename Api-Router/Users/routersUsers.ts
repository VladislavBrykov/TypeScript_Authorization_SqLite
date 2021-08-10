import express from 'express';
import controller from './controllerUsers';

const router = express.Router();

router.post('/login', controller.login);
router.get('/info', controller.infoUser);
router.get('/logout', controller.logout);
router.get('/latency', controller.latency);
router.post('/registration', controller.newUser);

export = router;