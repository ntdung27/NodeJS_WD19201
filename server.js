import express from "express"; //express dùng để khởi tạo node server

const app = new express; //khởi tạo express
const port = 3000; //khai báo cổng sẽ chạy node server

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
        console.log(req.query); 
        res.send('<h1>Đây là trang danh sách</h1>');
    })
    app.get('/detail/:name', (req,res) => {
        //gửi dữ liệu qua params: url có dạng /url/:tenParam
        console.log(req.params);
    })
    // console.log('Server dang chay o port' + port);
    console.log(`Server dang chay o port ${port}`);
})
