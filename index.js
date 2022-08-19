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

// 캘린더 전체출력
app.get('/clist', (req, res) => {
  const sqlQuery =
    'select cnum,ctitle,date_format(startdate, "%Y-%m-%d")as startdate,date_add(date_format(enddate, "%Y-%m-%d"),interval 1 day)as enddate,ccolor from calendar;';
  db.query(sqlQuery, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

//일정 수정
app.post('/cupdate', (req, res) => {
  console.log('일정수정', req.body);
  var cnum = parseInt(req.body.cnum);
  var ctitle = req.body.ctitle;
  var startdate = req.body.startdate;
  var enddate = req.body.enddate;
  var ccolor = req.body.ccolor;
  var userid = req.body.userid;

  const sqlQuery =
    'update calendar set ctitle=?,startdate=?,enddate=?,ccolor=? where cnum =?;';
  db.query(
    sqlQuery,
    [ctitle, startdate, enddate, ccolor, cnum],
    (err, result) => {
      res.send(result);
    },
  );
});

// 일정삭제
app.post('/cdelete', (req, res) => {
  console.log('삭제', req.body);
  var cnum = req.body.cnum;
  const sqlQuery = 'delete from calendar where cnum = ?;';
  db.query(sqlQuery, [cnum], (err, result) => {
    res.send(result);
  });
});

// ********************게시판 코드 시작 ********************

// 게시판 게시글 전체조회
app.get('/list', (req, res) => {
  console.log('list!!!');
  const sqlQuery = 'SELECT BOARDNUM, CATEGORY, BTITLE FROM BOARD;';
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

// 게시판 게시글 입력
//카테고리 넣어야함---------------------------------------------
app.post('/insert', (req, res) => {
  console.log('/insert', req.body);
  var writer = req.body.writer;
  var title = req.body.title;
  var content = req.body.content;
  var category = req.body.category;

  const sqlQuery =
    'INSERT INTO BOARD (USERID, BTITLE, BCONTENT, CATEGORY) values (?,?,?,?);';
  db.query(sqlQuery, [writer, title, content, category], (err, result) => {
    res.send(result);
  });
});

//게시판 게시글 상세보기
app.post('/detail', (req, res) => {
  console.log('/detail', req.body);
  var num = parseInt(req.body.num);

  const sqlQuery =
    "SELECT BOARDNUM, USERID, BTITLE, BCONTENT, DATE_FORMAT(BDATE, '%Y-%m-%d') AS BDATE FROM BOARD where BOARDNUM = ?;";
  db.query(sqlQuery, [num], (err, result) => {
    res.send(result);
  });
});

//게시판 게시글 업데이트
app.post('/update', (req, res) => {
  console.log('/update', req.body);
  var title = req.body.article.board_title;
  var content = req.body.article.board_content;
  var num = req.body.article.board_num;

  const sqlQuery =
    'update BOARD set BTITLE=?, BCONTENT=?, BDATE=now() where boardnum=?;';
  db.query(sqlQuery, [title, content, num], (err, result) => {
    res.send(result);
    console.log('result=', result);
  });
});

//게시판 게시글 삭제
app.post('/delete', (req, res) => {
  const num = req.body.num;
  console.log('/delete(id) => ', num);

  const sqlQuery = 'DELETE FROM BOARD WHERE BOARDNUM = ?;';
  db.query(sqlQuery, [num], (err, result) => {
    console.log(err);
    res.send(result);
  });
});

// ********************게시판 종료 ********************

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
