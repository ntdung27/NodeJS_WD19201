import { Router } from "express";
import ProductController from "../controllers/ProductController.js";
import { checkPermission } from "../middlewares/index.js";

const apiRouter = Router();
const proController = new ProductController();

//khai báo router:
//apiRouter.method('/url',middlewares(nếu có), tenController.tenHam);
apiRouter.get('/products', proController.apiList); //hiển thị danh sách
apiRouter.get('/products/:id', proController.apiDetail); //thông tin chi tiết
apiRouter.delete('/products/:id', checkPermission, proController.apiDelete); //xóa bản ghi
apiRouter.post('/products',checkPermission, proController.apiCreate);
apiRouter.put('/products/:id',checkPermission, proController.apiUpdate);

export default apiRouter;
