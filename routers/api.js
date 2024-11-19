import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const apiRouter = Router();
const proController = new ProductController();

//khai báo router:
//apiRouter.method('/url', tenController.tenHam);
apiRouter.get('/products', proController.apiList); //hiển thị danh sách

export default apiRouter;