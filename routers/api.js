import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const apiRouter = Router();
const proController = new ProductController();

//khai báo router:
//apiRouter.method('/url', tenController.tenHam);
apiRouter.get('/products', proController.apiList); //hiển thị danh sách
apiRouter.get('/products/:id', proController.apiDetail); //thông tin chi tiết
apiRouter.delete('/products/:id', proController.apiDelete); //xóa bản ghi
apiRouter.post('/products', proController.apiCreate);
apiRouter.put('/products/:id', proController.apiUpdate);

export default apiRouter;
