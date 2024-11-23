import { Router } from "express";
import AuthController from '../controllers/AuthController.js';

const authRouter = Router();
const authControl = new AuthController();

authRouter.post('/signup', authControl.signUp); //đăng ký
authRouter.post('/signin', authControl.signIn); //đăng nhập

export default authRouter;