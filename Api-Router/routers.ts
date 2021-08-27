import express from 'express';
import multer from 'multer';
import { asyncFunctionWrapper } from '../Helpers/async.function.wrapper';
import UserController from './Users/class.user.controlle';
import UserService from '../Service/Users/users.servece.data';
import PostController from './Posts/class.posts.controller';
import PostsService from '../Service/Posts/posts.servece.data';

const router = express.Router();
const userServices = new UserService();
const classUserController = new UserController(userServices);
const upload = multer({ dest: '../upload' });

// Authorization
router.post('/registration', asyncFunctionWrapper(classUserController.registration));
router.post('/login', asyncFunctionWrapper(classUserController.login));
router.get('/logout', asyncFunctionWrapper(classUserController.logout));
router.get('/delete-user', asyncFunctionWrapper(classUserController.deleteUser));
router.post('/password-update', asyncFunctionWrapper(classUserController.passwordUpdate));

// Posts
const postServices = new PostsService();
const classPostController = new PostController(postServices);
router.post('/new-post', upload.single('test'), asyncFunctionWrapper(classPostController.newPost));

export default router;
