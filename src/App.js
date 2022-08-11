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
    <Route>
      <Routes index element={<Login />} /> {/*로그인 : 현호*/}
      <Routes path="/join" element={<Join />} /> {/*회원가입 : 현호*/}
      <Routes path="/member" element={<Member />} /> {/*회원관리 : 현호*/}
      <Routes path="/mainFeed" element={<MainFeed />} /> {/* 전체피드 : 수호*/}
      <Routes path="/myFeed" element={<MyFeed />} /> {/*나의 피드 : 수호*/}
      <Routes path="/image" element={<Image />} /> {/*이미지 : 태용*/}
      <Routes path="/calendar" element={<Calendar />} /> {/*캘린더 : 주영*/}
      <Routes path="board" element={<Board />} /> {/*게시판 : 종현*/}
      <Routes path="map" element={<Map />} /> {/*지도 : 주영*/}
    </Route>
  );
};

export default App;
