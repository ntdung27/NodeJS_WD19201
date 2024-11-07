import express from "express"; //express dùng để khởi tạo node server
import ejs from "ejs"; //hỗ trợ xây dựng giao diện

const app = new express; //khởi tạo express
const port = 3000; //khai báo cổng sẽ chạy node server

//cấu hình ejs
app.set('engine', 'ejs'); //khai báo template engine
app.set('views', './views'); //khai báo đường dẫn đến thư mục chứa file giao diện

app.use(
    express.urlencoded({
        extended: true
    })
)

app.listen(port, () => {
    //khai báo router
    //app.method('/url', Controller);
    app.get('/list', (req,res) => {
        //gửi dữ liệu qua query: url có dạng ?query1=value1&query2=value2
        let name = req.query.name;
        let email = req.query.email; 
        // res.send('<h1>Đây là trang danh sách</h1>'); res.send(): trả về string (có thể viết code html)
        console.log(name);

        //BT: Tạo 1 biến dạng array -> in dữ liệu của mảng đó ra giao diện
        let array = [
            { name: 'thaivm2', email: 'thaivm2@fpt.edu.vn'},
            { name: 'thaivm3', email: 'thaivm3@fpt.edu.vn'},
            { name: 'thaivm4', email: 'thaivm4@fpt.edu.vn'},
            { name: 'thaivm5', email: 'thaivm5@fpt.edu.vn'},
        ]

        res.render('list.ejs', {array});
    })

    app.get('/detail/:name', (req,res) => {
        //gửi dữ liệu qua params: url có dạng /url/:tenParam
        console.log(req.params);
    })
    // console.log('Server dang chay o port' + port);
    console.log(`Server dang chay o port ${port}`);
})
