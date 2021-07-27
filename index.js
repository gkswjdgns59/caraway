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
        socket.emit('data', server.database);
    })

    socket.on('fetch',()=>{
        socket.emit('data',server.database)
    })

    socket.on('execute',(choices) => {
        //choices = {임세훈 : 문화공연, 한정훈: 미궁...}

    })
    socket.on('onLogin', (data)=>{
        const user = Object.keys(data)[0];
        if (Object.keys(server.database).includes(data[user].code)){
          server.database[data[user].code].people[user] = data[user];
          socket.emit('loggedIn', data);
        }else{
          socket.emit('failed');
        }
    })

    socket.on('onLogout', (user, key)=>{
        delete server.database[key].people[user];
        socket.broadcast.emit('dataChange', server.database);
        socket.emit('loggedOut');
        })
    });

server.database = {abc : {
    projectName : '21 신대생 팀 배분',
    programs : {
        1:{spring:{programName:"OT", memberNumber:4, memberList:{0:"임세훈", 1:"Han Jeonghoon"}}},
        2:{spring:{programName:"더 지니어스", memberNumber:5, memberList:{0:"임세훈", 1:"Han Jeonghoon", 2:"전우정"}}},
        3:{spring:{programName:"특강", memberNumber:4, memberList:{0:"Chung Jaeryung", 1:"Han Jeonghoon"}}},
        4:{spring:{programName:'한글날',memberNumber:3, memberList:{0:"임세훈", 1:"전우정", 2:"Han Jeonghoon"}},
        fall:{programName:'홈파티',memberNumber:4, memberList:{0:"전우정", 1:"Chung Jaeryung"}}},
        5:{spring:{programName:'문화공연',memberNumber:3,memberList:{0:"Chung Jaeryung"}}},
        6:{spring:{programName:'미궁',memberNumber:5,memberList:{0:"임세훈"}},
        fall:{programName:'한국프로그램',memberNumber:4,memberList:{0:"Chung Jaeryung", 1:"임세훈", 2:"Han Jeonghoon",0:"전우정"}}},
        7:{spring:{programName:'명사특강',memberNumber:4,memberList:{0:"전우정", 1:"Han Jeonghoon"}}},
        8:{spring:{programName:'미리메리크리스마스',memberNumber:4, memberList:{0:"Han Jeonghoon", 1:"전우정"}}}
    },
    people: {
        '임세훈':{icon:"😗", color:"#a8c9ae", ready:false}, 
        'Han Jeonghoon':{icon:"😗", color:"#e1b3b3", ready:true}, 
        '전우정':{icon:"😗", color:"#f6dc77", ready:true}, 
        'Chung Jaeryung':{icon:"😗", color:'#A7C7E7', ready:false}
    },
    search: {
        OT: {nth:1, for: 'spring'},
        '더 지니어스': {nth:2, for: 'spring'},
        '특강': {nth:3, for: 'spring'},
        '한글날': {nth:4, for: 'spring'},
        '홈파티': {nth:4, for: 'fall'},
        "문화공연": {nth:5, for:'spring'},
        "미궁": {nth:6, for:'spring'},
        "한국프로그램": {nth:6, for:'fall'},
        "명사특강": {nth:7, for:'spring'},
        "미리메리크리스마스":{nth:8, for:'spring'}
    }
    }}

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