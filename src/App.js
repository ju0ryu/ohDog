import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MainFeed from './components/MainFeed';
import Login from './components/Login';
import Join from './components/Join';
import Member from './components/Member';
import MyFeed from './components/MyFeed';
import Image from './components/Image';
import Calendars from './components/Calendars';
import Board from './components/board/Board';
import Maps from './components/Maps';
import Header from './components/Header';
import Animal from './components/Animal';
import EditMember from './components/EditMember';
import BoardDetail from './components/board/BoardDetail';
import BoardWrite from './components/board/BoardWrite';
import BoardUpdateForm from './components/board/BoardUpdateForm';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState();
  console.log(
    'Login:window.sessionStorage(login_id) =>',
    window.sessionStorage.getItem('id'),
  );
  useEffect(() => {
    console.log(visible);
  }, [visible]);

  useEffect(() => {
    if (window.sessionStorage.getItem('id') != null) {
      console.log('로그인확인');
    } else {
      // alert('로그인 후 이용해 주세요');
      navigate('/');
    }
  }, []);

  const location = useLocation();
  return (
    <div className="App">
      {/* <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={{ enter: 300, exit: 200 }}
        >
          <div> */}
      {window.sessionStorage.getItem('id') != null && <Header />}
      <Routes location={location}>
        <Route index element={<Login />} /> {/*로그인 : 현호*/}
        <Route path="/join1" element={<Join />} /> {/*회원가입 : 현호*/}
        <Route path="/member" element={<Member />} /> {/*회원관리 : 현호*/}
        <Route path="/mainFeed" element={<MainFeed />} /> {/* 전체피드 : 수호*/}
        <Route path="/myFeed" element={<MyFeed />} /> {/*나의 피드 : 수호*/}
        <Route path="/image" element={<Image />} /> {/*이미지 : 태용*/}
        <Route path="/calendar" element={<Calendars />} /> {/*캘린더 : 주영*/}
        <Route path="/map" element={<Maps />} /> {/*지도 : 주영*/}
        <Route path="/board" element={<Board />} /> {/*게시판 : 종현*/}
        <Route path="/detail" element={<BoardDetail />} /> {/*게시판 : 종현*/}
        <Route path="/insert" element={<BoardWrite />} /> {/*게시판 : 종현*/}
        <Route path="/update" element={<BoardUpdateForm />} />
        {/*게시판 : 종현*/}
        <Route path="/animal" element={<Animal />} />
        {/*애완동물 등록페이지*/}
        <Route path="/editMember" element={<EditMember />} />
        {/*회원정보수정 페이지*/}
      </Routes>
      {/* </div>
        </CSSTransition>
      </TransitionGroup> */}
    </div>
  );
};

export default App;
