import { Router } from "express";
import productRouter from "./products.js";
import apiRouter from './api.js';

const router = Router();

router.use('/', productRouter); //router cho Products (views)
router.use('/api', apiRouter); //router cho Restful API

export default router;