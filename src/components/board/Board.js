import React from 'react';
import '../../css/board.scss';
import { Link } from 'react-router-dom';
import BoardList from './BoardList';
import { useState } from 'react';
import axios from 'axios';

function Board() {
  const [boardlist, setBoardlist] = useState({
    boardList: [],
  });

  // 글목록
  const getList = () => {
    axios
      .get('http://localhost:8008/list', {})
      .then((res) => {
        console.log('res ==>', res);
        const { data } = res;
        console.log('data ==>', data);
        setBoardlist({
          boardList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <div>
        <BoardList boardlist={boardlist} handlelist={getList}></BoardList>
      </div>
      <div>
        <Link to="/insert">
          <button>글쓰기</button>
        </Link>
      </div>
    </>
  );
}
export default Board;
