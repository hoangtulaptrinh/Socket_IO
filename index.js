import express from 'express';
import socket from 'socket.io';
import http from 'http';

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public')); //thông báo rằng lưu trữ các file static đc lưu ở trong public

const port = 8080;

const server = http.Server(app);
const io = socket(server);
//io.on tức là bắt sự kiện lắng nghe
//io.on(connection) : lắng nghe sự kiện khi có người dùng kết nối
io.on('connection', (socket) => {
  console.log(`vừa có người kết nối và id là : ${socket.id}`);
  socket.on('Client-send-data', (data) => {
    //Case 1:
    //io.sockets.emit là sever gửi cho tất cả mọi người VD: A gửi => sever gửi cho tất cả mọi người
    //io.sockets.emit('Sever-send-data', `Data Sever Trả Về Nè ${data}`);
    //Case 2:
    //socket.emit là sever chỉ gửi cho chính người gửi lên thôi VD: A gửi => sever gửi lại A
    //socket.emit('Sever-send-data', `Data Sever Trả Về Nè ${data}`);
    //Case 3:
    //socket.broadcast.emit là sever cho tất cả mọi người trừ người gửi VD: A gửi => sever gửi lại cho tất cả mọi người trừ A
    //socket.broadcast.emit('Sever-send-data', `Data Sever Trả Về Nè ${data}`);
    //Case 4:
    //io.to('idSocket').emit là gửi riêng cho 1 người nào đó với idSocket truyền vào
    // io.to('idSocket').emit('???');
  });
  //io.on('disconnect',func) : lắng nghe sự kiện khi có người dùng ngắt kết nối
  socket.on('disconnect', () => {
    console.log(`vừa có người ngắt kết nối và id là : ${socket.id}`);
  });
});

app.get('/', (req, res) => {
  res.render('trangchu');
});

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
