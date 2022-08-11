const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); //요청정보 처리를 위함
const cors = require('cors'); // 교차허용

const app = express(); //서버생성
const PORT = process.env.port || 8008; //포트설정

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let corsOptions = {
  origin: '*', //출저 허용 옵션
  credential: true, //사용자 인증이 필요한 리소스(쿠키...등) 접근
};

app.use(cors(corsOptions));

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'bbs',
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
