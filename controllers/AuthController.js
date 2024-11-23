import User from "../models/User.js";
import bcryptjs from 'bcryptjs'; //mã hóa password
import jwt from 'jsonwebtoken'; //tạo token khi đăng nhập

class AuthController {
    async signUp(req,res) {
        try {
            //lấy dữ liệu người dùng gửi lên
            const { email, password } = req.body;
            //kiểm tra email đã tồn tại hay chưa?
            const existedEmail = await User.findOne({email});
            if (existedEmail) {
                return res.status(400).json({
                    'message': 'Email đã tồn tại'
                })
            }
            //mã hóa password: bcryptjs.hash(duLieuCanMaHoa,sốVòngLặpMãHóa)
            const hashedPass = await bcryptjs.hash(password,10);
            //lưu dữ liệu vào trong db
            const user = await User.create({
                email,
                password: hashedPass,
            })
            //trả dữ liệu về
            res.status(200).json({
                'message': 'Đăng ký thành công',
                'data': user
            })
        } catch (error) {
            res.status(400).json({
                'message': 'Something went wrong'
            })
        }
    }

    async signIn(req,res) {
        //lấy dữ liệu người dùng gửi lên
        const { email, password } = req.body;
        //kiểm tra xem có đúng email không?
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({
                'message': 'Email không đúng',
            })
        }
        //kiểm tra password có trùng khớp không?
        //bcryptjs.compare(duLieuDayLenPostman,passwordDaMaHoaTrongDB)
        const checkPass = await bcryptjs.compare(password,user.password);
        if (!checkPass) {
            return res.status(400).json({
                'message': 'Thông tin không đúng'
            })
        }
        //Nếu email/password đúng hết, tạo ra token
        const token = await jwt.sign(
            { email: user.email }, //dữ liệu để tạo token (dùng 1 cái unique, không bị trùng)
            'wd19201', //secretKey
            { expiresIn: '1d' } //thời gian hết hạn: 2 cách: tính bằng giây (Number); tính bằng ngày/giờ (String)
        )
        //trả dữ liệu về
        res.status(200).json({
            'message': 'Đăng nhập thành công',
            'data': user,
            token,
        })
    }
}

export default AuthController;
