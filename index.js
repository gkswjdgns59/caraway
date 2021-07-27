// express 모듈 불러오기
const express = require('express');

// express 객체 생성
const app = express();
const cors = require("cors");
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: true,
    origins:["localhost:3000"]
  });

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('check', ()=>{
        console.log('checked')
    })
  });

// 기본 포트를 app 객체에 설정
const port = process.env.PORT || 5000;
// app.listen(port);

// 미들웨어 함수를 특정 경로에 등록
app.use(cors());
app.use('/api/data', function(req, res) {
    res.json({ greeting: 'Hello World' });
});
app.use('/', (req, res) => {
    res.json({greeting: 'Hello World'});
});

server.listen(port, () => {
    console.log(`express is running on ${port}`);
  });

// console.log(`server running at http ${port}`);