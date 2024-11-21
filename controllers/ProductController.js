import Product from "../models/Product.js";

//khởi tạo class ProductController
class ProductController {
    async getList (req,res) { //khởi tạo hàm lấy danh sách sản phẩm
        //B1: lấy dữ liệu từ db
        const products = await Product.find(); //truy vấn lấy danh sách sp
        //B2: trả dữ liệu ra giao diện
        res.render('list.ejs', {products});
    }

    async getDetail(req,res) {
        //B1: lấy id của bản ghi
        const id = req.params.product;
        //B2: truyền id lên để lấy thông tin chi tiết
        const product = await Product.findById(id);
        //B3: đổ dữ liệu ra giao diện
        res.render('detail.ejs', {product});
    }

    async delete(req,res) {
        //B1: lấy id bản ghi
        const id = req.params.product;

        await Product.findByIdAndDelete(id); //xóa theo id

        res.redirect('/list'); //dưa ng dùng về trang danh sách
    }

    create(req,res) {
        res.render('create.ejs');
    }

    async store(req,res) {
        //B1: lấy dữ liệu người dùng nhập vào form req.body.inputName
        const newProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
        }
        //B2: đẩy dữ liệu lên lưu vào db
        await Product.create(newProduct);

        res.redirect('/list');
    }

    async edit(req,res) {
        //B1: lấy id của bản ghi cần sửa
        const id = req.params.product;
        //B2: truy vấn dữ liệu 
        const product = await Product.findById(id);
        //B3: đổ dữ liệu ra giao diện
        res.render('edit.ejs', {product});
    }

    async update(req,res) {
        //B1: lấy ng dùng nhập vào form
        const data = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
        }
        //B2: lấy id bản ghi cần chỉnh sửa
        const id = req.params.product;
        //B3: gửi dữ liệu lên để update
        await Product.findByIdAndUpdate(id,data);
        //B4: đưa ng dùng về trang danh sách
        res.redirect('/list');
    }

    //API controllers
    async apiList(req,res) {
        try {
            //truy vấn danh sách sản phẩm
            const products = await Product.find();

            res.status(200).json({ //trả dữ liệu dưới dạng json
                'message': 'Lấy dữ liệu thành công',
                'data': products,
            })
        } catch (error) {
            res.status(400).json({
                'message': 'Something went wrong'
            })
        };
    }

    async apiDetail(req,res) {
        try {
            //B1: lấy id bản ghi cần xem chi tiết
            const id = req.params.id;
            //B2: truyền id lên truy vấn trong mongo
            const product = await Product.findById(id);
            //B3: trả dữ liệu
            res.status(200).json({
                'message': 'Thành công',
                'data': product
            })
        } catch (error) {
            res.status(400).json({
                'message': 'Something went wrong'
            })
        }
    }

    async apiDelete(req,res) {
        try {
            //B1: lấy id bản ghi cần xóa
            const id = req.params.id;
            //B2: gửi id lên để truy vấn
            const deletedPro = await Product.findByIdAndDelete(id);
            //B3: trả dữ liệu về
            res.status(200).json({
                'message': 'Xóa thành công',
                'data': deletedPro
            })
        } catch (error) {
            res.status(400).json({
                'message': 'Something went wrong'
            })
        }
    }

    async apiCreate(req,res) {
        try {
            //B1: lấy dữ liệu người dùng gửi lên
            const data = req.body;
            //B2: đẩy dữ liệu lên, lưu vào DB
            const newProduct = await Product.create(data);
            //B3: trả dữ liệu về
            res.status(200).json({
                'message': 'Thêm mới thành công',
                'data': newProduct
            })
        } catch (error) {
            res.status(400).json({
                'message': 'Something went wrong'
            })
        }
    }

    async apiUpdate(req,res) {
        try {
            //B1: lấy id bản ghi cần sửa
            const id = req.params.id;
            //B2: lấy dữ liệu mới
            const data = req.body;
            //B3: đẩy dữ liệu lưu vào DB
            const product = await Product.findByIdAndUpdate(id,data);
            //B4: trả về dữ liệu
            res.status(200).json({
                'message': 'Chỉnh sửa thành công',
                'data': product
            })
        } catch (error) {
            res.status(400).json({
                'message': 'Something went wrong'
            })
        }
    }
}

export default ProductController