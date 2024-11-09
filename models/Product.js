import mongoose from "mongoose"; //kết nối vs mongoDB

const Schema = mongoose.Schema; //khởi tạo schema

const ProductSchema = new Schema( //khai báo trường dữ liệu ở trong bảng
    {
        //tênTrường: { type: , require, unique }
        name: { type: String, require: true },
        price: { type: Number },
        description: { type: String },
        image: { type: String },
    },
    {timestamps: true} //thêm created_at, updated_at cho bản ghi
)

const Product = mongoose.model('Product', ProductSchema);

export default Product;

