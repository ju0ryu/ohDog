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

  // // 상세보기
  // const handleDetail = (e) => {
  //   // alert("handleDetail(actionMode) =>" + actionMode.mode);
  //   axios
  //     .post('http://localhost:8008/detail', { num: e.target.id })
  //     .then((res) => {
  //       const { data } = res;
  //       console.log('detail =>', data);
  //       if (res.data.length > 0) {
  //         setArticle({
  //           ...article,
  //           board_num: data[0].BOARD_NUM,
  //           board_writer: data[0].BOARD_WRITER,
  //           board_title: data[0].BOARD_TITLE,
  //           board_content: data[0].BOARD_CONTENT,
  //           board_date: data[0].BOARD_DATE,
  //         }); //네비게이트
  //       }
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  return (
    <>
      <div>
        <BoardList boardlist={boardlist} handlelist={getList}></BoardList>
      </div>
      <div align="center">
        <input
          classname="search"
          type="text"
          placeholder="관심있는 내용을 검색해보세요!"
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
