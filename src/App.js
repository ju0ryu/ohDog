import React, { useState } from 'react';
import BoardWrite from './BoardWrite';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import BoardUpdateForm from './BoardUpdateForm';

const App = () => {
  // 0:글쓰기 , 1:상세보기 , 2:글수정
  const [actionMode, setActionMode] = useState({ mode: 0 });
  if (actionMode.mode === 0) {
    //글쓰기
    return (
      <div>
        <BoardWrite></BoardWrite>
        <br />
        <BoardList></BoardList>
      </div>
    );
  } else if (actionMode.mode === 1) {
    //상세보기
    return (
      <div>
        <BoardDetail></BoardDetail>
        <br />
        <BoardList></BoardList>
      </div>
    );
  } else if (actionMode.mode === 2) {
    //글수정
    return (
      <div>
        <BoardUpdateForm></BoardUpdateForm>
        <br />
        <BoardList></BoardList>
      </div>
    );
  }
};

export default App;
