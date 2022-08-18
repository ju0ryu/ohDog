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

//myfeed  req res 설정 시작

// app.get('/flist', (req, res) => {
//   console.log('list!!!');
//   const sqlQuery =
//     "SELECT userid, fcomment, DATE_FORMAT(fdate, '%m-%d-%H-%i') AS fdate FROM feed;";
//   db.query(sqlQuery, (err, result) => {
//     res.send(result);
//   });
// });
// //전체피드

app.post('/flist', (req, res) => {
  console.log('내피드', req.body);
  var userid = req.body.userid;
  const sqlQuery =
    "SELECT fnum, userid, fcomment, DATE_FORMAT(fdate, '%m월%d일 %H:%i') AS fdate from feed where userid = 'userid 01';";
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

// 캘린더

//캘린더 일정입력
app.post('/cinsert', (req, res) => {
  console.log('cinsert check ---------', req.body);
  var ctitle = req.body.ctitle;
  var startdate = req.body.startdate;
  var enddate = req.body.enddate;
  var ccolor = req.body.ccolor;
  var userid = req.body.userid;

  const sqlQuery =
    'insert into calendar (ctitle, startdate, enddate, ccolor, userid) values(?,?,?,?,?);';
  db.query(
    sqlQuery,
    [ctitle, startdate, enddate, ccolor, userid],
    (err, result) => {
      // console.err(err);
      res.send(result);
    },
  );
});

// 캘린더 전체출력
app.get('/clist', (req, res) => {
  const sqlQuery =
    'select cnum,ctitle,date_format(startdate, "%Y-%m-%d")as startdate,date_add(date_format(enddate, "%Y-%m-%d"),interval 1 day)as enddate,ccolor from calendar;';
  db.query(sqlQuery, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

// app.post('/update', (req, res) => {
//    var ctitle = req.body.ctitle;
//   var startdate = req.body.startdate;
//   var enddate = req.body.enddate;
//    var ccolor = req.body.ccolor;
//   var userid = req.body.userid;

//   const sqlQuery = 'update calendar set ctitle=?,startdate=?,enddate=?,ccolor=?'
// })

// myfeed req res 설정 끝

const multer = require("multer");
const path = require("path");
const fs = require("fs");
// 세가지 추가됨 멀터는 파일 추가
// 패스는 경로
// fs 파일 다루를수 있음

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}
// 업로드 파일 생성 시켜주는듯?????
// 밑에 무저껀 넣어야함?
const upload = multer({
  storage: multer.diskStorage({
    // 읽어오기???
    destination(req, file, done) {
      // done>>>위치찾기??건이씨 설명
      done(null, "uploads/");
    },
    // 업로드 경로 변경 시킬수 있음
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});
// 객체 만들면 스토리지 디스토리이지 저장경로 ???
// 파일네임 업로드 된 파일 경로? ext 확장자만 base는 확장자 제외하고?? 데이터 나우는 현재시간 뒤에는 확장자?

// 이미지가 저장된 경로를 static으로 지정하면 불러올 수 있다.
app.use("/uploads", express.static("uploads"));


app.post('/iinsert', upload.single("image"), (req, res) => {
  console.log("/iinsert", req.file, req.body);
  var userid = req.body.userid;

  var secret = req.body.secret;

  const sqlQuery =
    "INSERT INTO image (userid, imgurl, secret) values (?,?,?);";
  db.query(
    sqlQuery,
    [userid, req.file.filename, secret,],
    // 파일네임 실제 업로드된 파일명임
    (err, result) => {
      res.send(result);
    }
  );
});













app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
