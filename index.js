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

// connection : lắng nghe sự kiện người dùng kết nối
io.on('connection', (socket) => {
  console.log(`vừa có người kết nối và id là : ${socket.id}`);
  // disconnect : lắng nghe sự kiện người dùng ngắt kết nối
  socket.on('disconnect', () => {
    console.log(`vừa có người ngắt kết nối và id là : ${socket.id}`);
  });
});

app.get('/', (req, res) => {
  res.render('trangchu');
});

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
