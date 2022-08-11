import { Route, Routes } from 'react-router-dom';
import React from 'react';
import MainFeed from './components/MainFeed';
import Login from './components/Login';
import Join from './components/Join';
import Member from './components/Member';
import MyFeed from './components/MyFeed';
import Image from './components/Image';
import Calendar from './components/Calendar';
import Board from './components/Board';
import Map from './components/Map';
const App = () => {
  return (
    <Routes>
      <Route index element={<Login />} /> {/*로그인 : 현호*/}
      <Route path="/join" element={<Join />} /> {/*회원가입 : 현호*/}
      <Route path="/member" element={<Member />} /> {/*회원관리 : 현호*/}
      <Route path="/mainFeed" element={<MainFeed />} /> {/* 전체피드 : 수호*/}
      <Route path="/myFeed" element={<MyFeed />} /> {/*나의 피드 : 수호*/}
      <Route path="/image" element={<Image />} /> {/*이미지 : 태용*/}
      <Route path="/calendar" element={<Calendar />} /> {/*캘린더 : 주영*/}
      <Route path="board" element={<Board />} /> {/*게시판 : 종현*/}
      <Route path="map" element={<Map />} /> {/*지도 : 주영*/}
    </Routes>
  );
};

export default App;
