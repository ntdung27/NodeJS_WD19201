import Product from "../models/Product.js";

//khởi tạo class ProductController
class ProductController {
    async getList (req,res) { //khởi tạo hàm lấy danh sách sản phẩm
        //B1: lấy dữ liệu từ db
        const products = await Product.find(); //truy vấn lấy danh sách sp
        //B2: trả dữ liệu ra giao diện
        res.render('list.ejs', {products});
    }
}

export default ProductController