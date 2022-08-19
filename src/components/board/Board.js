import React, { useEffect } from 'react';
import '../../css/board.scss';
import { Link } from 'react-router-dom';
import BoardList from './BoardList';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Board() {
  const [boardlist, setBoardlist] = useState({
    boardList: [],
  });

  const [article, setArticle] = useState({
    boardnum: 0,
    userid: '',
    btitle: '',
    bcontent: '',
    bdate: '',
    category: '',
  });

  // 글목록
  useEffect(() => {
    axios
      .get('http://localhost:8008/list', {})
      .then((res) => {
        console.log('res ==>', res);
        const { data } = res;
        console.log('data ==>', data);
        setBoardlist({
          boardList: data,
        });
        // 여기도 navigate 써야하나?
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      <div>
        <BoardList boardlist={boardlist}></BoardList>
      </div>
      <div align="center">
        <input
          classname="search"
          type="text"
          placeholder="관심있는 내용을 검색해보세요!"
          size="64"
        ></input>
      </div>
      <div align="center">
        <Link to="/insert">
          <button>글쓰기</button>
        </Link>
      </div>
    </>
  );
}
export default Board;
