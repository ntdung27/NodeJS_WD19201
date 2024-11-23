import { Router } from "express";
import productRouter from "./products.js";
import apiRouter from './api.js';
import authRouter from "./auth.js";

const router = Router();

router.use('/', productRouter); //router cho Products (views)
router.use('/api', apiRouter); //router cho Restful API
router.use('/auth', authRouter); //router cho đăng ký/đăng nhập

export default router;