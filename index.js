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
  host: '210.114.22.116',
  user: 'js_team_6',
  password: 'js123456',
  database: 'js_team_6',
});

//mainfeed req res 설정 시작

app.get('/mainfeed', (req, res) => {
  console.log('main!!!');
  const sqlQuery =
    "SELECT userid, fcomment, DATE_FORMAT(fdate, '%m-%d-%H-%i') AS fdate FROM feed where secret =  'Y' order by date_format(fdate, '%m-%d-%H-%i') desc ;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

//mainfeed req res 설정 끝

//myfeed  req res 설정 시작

app.post('/flist', (req, res) => {
  console.log('내피드', req.body);
  var userid = req.body.userid;
  const sqlQuery =
    "SELECT fnum, userid, fcomment, DATE_FORMAT(fdate, '%m월%d일 %H:%i') AS fdate from feed where userid = 'userid 01' order by date_format(fdate, '%m월%d일 %H:%i') desc;";
  db.query(sqlQuery, [userid], (err, result) => {
    res.send(result);
  });
});

app.post('/finsert', (req, res) => {
  console.log('/insert', req.body);
  var userid = req.body.userid;
  var writer = req.body.writer;
  var secret = req.body.secret;

  const sqlQuery = 'INSERT INTO feed (userid, fcomment,secret) values (?,?,?);';
  db.query(sqlQuery, [userid, writer, secret], (err, result) => {
    res.send(result);
  });
});

app.post('/fdelete', (req, res) => {
  const fnum = req.body.fnum;
  console.log('/delete(id) => ', fnum);

  const sqlQuery = 'DELETE FROM feed WHERE fnum = ?;';
  db.query(sqlQuery, [fnum], (err, result) => {
    console.log(err);
    res.send(result);
  });
});

// myfeed req res 설정 끝

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
