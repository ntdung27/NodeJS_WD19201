//Kiểm tra token có hợp lệ hay không?
import jwt from 'jsonwebtoken'; 
import User from '../models/User.js';

const checkPermission = async (req,res,next) => {
    try {
        //B1: nhận token từ phía người dùng
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) { //nếu không có token
            return res.status(401).json({
                'message': 'Không có quyền truy cập'
            })
        }
        //B2: kiểm tra token có hợp lệ không: jwt.verify(token, 'secretKey')
        const data = jwt.verify(token, 'wd19201');
        if (!data) { //nếu không verify được token
            return res.status(401).json({
                'message': 'Không có quyền truy cập'
            })
        }
        //B3: kiểm tra email/id ở trong token có đúng hay không?
        const user = await User.findOne({ email: data.email });
        if (!user) { //nếu không có user
            return res.status(401).json({
                'message': 'Không có quyền truy cập'
            })
        }
        next(); //cho nó đi tiếp sang controller
    } catch (error) {
        res.status(401).json({
            'message': 'Something went wrong'
        })
    }
    
}

export { checkPermission }