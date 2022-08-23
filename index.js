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

// 로그인
app.post('/login', (req, res) => {
  console.log('/login', req.body);
  var id = req.body.id;
  var pw = req.body.pw;

  const sqlQuery =
    "select count(*) as 'cnt' from member where userid=? and userpw=?;";
  db.query(sqlQuery, [id, pw], (err, result) => {
    res.send(result);
  });
});
//회원가입
app.post('/member', (req, res) => {
  console.log('/member', req.body);
  var id = req.body.id;
  var pw = req.body.pw;
  var checkpw = req.body.checkpw;
  var nickname = req.body.nickname;
  var tel = req.body.tel;
  var addr = req.body.addr;
  var birth = req.body.birth;
  var gender = req.body.gender;

  const sqlQuery =
    'insert into member (userid, userpw, checkpw, nickname,tel,addr,birth,gender) values (?,?,?,?,?,?,?,?);';
  db.query(
    sqlQuery,
    [id, pw, checkpw, nickname, tel, addr, birth, gender],
    (err, result) => {
      res.send(result);
    },
  );
});

//mainfeed req res 설정 시작 (전체피드)

app.get('/mainfeed', (req, res) => {
  console.log('main!!!');
  const sqlQuery =
    "SELECT userid, fcomment, DATE_FORMAT(fdate, '%m-%d-%H-%i') AS fdate FROM feed where secret =  'Y' order by date_format(fdate, '%m-%d-%H-%i') desc ;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

//mainfeed req res 설정 끝

//myfeed  req res 설정 시작 (마이피드)

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

//fcomment req res 설정 시작 (댓글기능)

app.post('/fccontenlist', (req, res) => {
  console.log('피드댓글', req.body);
  var userid = req.body.userid;
  const sqlQuery =
    "SELECT fnum, userid, fccontent, DATE_FORMAT(fcdate, '%m월%d일 %H:%i') AS fdate from fcomment where userid = 'userid 01' order by date_format(fdate, '%m월%d일 %H:%i') desc;";
  db.query(sqlQuery, [userid], (err, result) => {
    res.send(result);
  });
});

app.post('/fccontentinsert', (req, res) => {
  console.log('댓글달기', req.body);
  var userid = req.body.userid;
  var fccontent = req.body.fccontent;

  const sqlQuery = 'INSERT INTO fcomment (userid, fccontent) values (?,?);';
  db.query(sqlQuery, [userid, fccontent], (err, result) => {
    res.send(result);
  });
});

app.post('/fccontentdelete', (req, res) => {
  const fcnum = req.body.fnum;
  console.log('/delete(fccontent) => ', fcnum);

  const sqlQuery = 'DELETE FROM fcomment WHERE fcnum = ?;';
  db.query(sqlQuery, [fcnum], (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//fcomment req res 설정 끝

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
app.post('/clist', (req, res) => {
  var userid = req.body.id;
  const sqlQuery =
    'select cnum,ctitle,date_format(startdate, "%Y-%m-%d")as startdate,date_add(date_format(enddate, "%Y-%m-%d"),interval 1 day)as enddate,ccolor from calendar where userid = ?;';
  db.query(sqlQuery, [userid], (err, result) => {
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

// 일정삭제
app.post('/cdelete', (req, res) => {
  console.log('삭제', req.body);
  var cnum = req.body.cnum;
  const sqlQuery = 'delete from calendar where cnum = ?;';
  db.query(sqlQuery, [cnum], (err, result) => {
    res.send(result);
  });
});

// ================================사진 시작 ===========================

const multer = require('multer');
const path = require('path');
const fs = require('fs');
// 세가지 추가됨 멀터는 파일 추가
// 패스는 경로
// fs 파일 다루를수 있음

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
// 업로드 파일 생성 시켜주는듯?????
// 밑에 무저껀 넣어야함?
const upload = multer({
  storage: multer.diskStorage({
    // 읽어오기???
    destination(req, file, done) {
      // done>>>위치찾기??건이씨 설명
      done(null, 'uploads/');
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
app.use('/uploads', express.static('uploads'));

app.post('/iinsert', upload.single('image'), (req, res) => {
  console.log('/iinsert', req.file, req.body);
  var userid = req.body.userid;

  var secret = req.body.secret;

  const sqlQuery = 'INSERT INTO image (userid, imgurl, secret) values (?,?,?);';
  db.query(
    sqlQuery,
    [userid, req.file.filename, secret],
    // 파일네임 실제 업로드된 파일명임
    (err, result) => {
      res.send(result);
    },
  );
});

app.post('/ilist', upload.single('image'), (req, res) => {
  console.log('/ilist', req.file, req.body);
  var userid = req.body.userid;

  var secret = req.body.secret;

  const sqlQuery = 'INSERT INTO image (userid, imgurl, secret) values (?,?,?);';
  db.query(
    sqlQuery,
    [userid, req.file.filename, secret],
    // 파일네임 실제 업로드된 파일명임
    (err, result) => {
      res.send(result);
    },
  );
});

// ================================사진 끝===========================
// ================================동물
app.post('/ainsert', upload.single('image'), (req, res) => {
  console.log('/ainsert', req.file, req.body);
  var userid = req.body.userid;
  var aname = req.body.aname;
  var agender = req.body.agender;
  var aspecies = req.body.aspecies;
  var aage = parseInt(req.body.aage);

  const sqlQuery =
    'INSERT INTO animal (aimg,aname,agender,aspecies,aage,userid) values (?,?,?,?,?,?);';
  db.query(
    sqlQuery,
    [req.file.filename, aname, agender, aspecies, aage, userid],
    (err, result) => {
      res.send(result);
    },
  );
});

app.post('/alist', (req, res) => {
  console.log('alist :', req.body);
  var userid = req.body.userid;
  const sqlQuery =
    'select anum, aimg, aname,agender,aspecies,aage from animal where userid=?;';
  db.query(sqlQuery, [userid], (err, result) => {
    res.send(result);
  });
});

app.post('/adelete', (req, res) => {
  console.log('adelete :', req.body);
  var anum = parseInt(req.body.anum);
  const sqlQuery = 'delete from animal where anum = ?;';
  db.query(sqlQuery, [anum], (err, result) => {
    res.send(result);
  });
});

// ********************게시판 코드 시작 ********************

// 게시판 게시글 전체조회
app.get('/list', (req, res) => {
  console.log('list!!!');
  const sqlQuery = 'SELECT boardnum, category, btitle FROM board;';
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

// 게시판 게시글 입력
//카테고리 넣어야함---------------------------------------------
app.post('/insert', (req, res) => {
  console.log('/insert', req.body);
  var title = req.body.title;
  var writer = req.body.writer;
  var content = req.body.content;
  var category = req.body.category;

  const sqlQuery =
    'INSERT INTO board (userid, btitle, bcontent, category) values (?,?,?,?);';
  db.query(sqlQuery, [writer, title, content, category], (err, result) => {
    res.send(result);
  });
});

//게시판 게시글 상세보기
app.post('/detail', (req, res) => {
  console.log('/detail', req.body);
  var num = parseInt(req.body.num);

  const sqlQuery =
    "SELECT boardnum, userid, btitle, bcontent, DATE_FORMAT(bdate, '%Y-%m-%d') AS bdate FROM board where boardnum = ?;";
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
