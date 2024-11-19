import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productRouter = Router();
const proController = new ProductController();

//khai bảo router: app.method('/url', tenController.tenFunction)
productRouter.get('/list', proController.getList);
productRouter.get('/detail/:product', proController.getDetail);
productRouter.get('/delete/:product', proController.delete);
//thêm mới
productRouter.get('/create', proController.create); //trả về form nhập dữ liệu
productRouter.post('/store', proController.store); //lưu dữ liệu mới vào db
//chỉnh sửa
productRouter.get('/edit/:product', proController.edit); //trả về form sửa
productRouter.post('/update/:product', proController.update); //lưu dữ liệu cập nhật vào DB

export default productRouter;