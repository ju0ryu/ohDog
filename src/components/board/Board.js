import React, { useEffect, useRef } from 'react';
import '../../css/board.scss';
import { Link } from 'react-router-dom';
import BoardList from './BoardList';
import { useState } from 'react';
import axios from 'axios';

function Board() {
  const [boardlist, setBoardlist] = useState({
    boardList: [],
  });
  const searchCategoryRef = useRef();
  // const [article, setArticle] = useState({
  //   boardnum: 0,
  //   userid: '',
  //   btitle: '',
  //   bcontent: '',
  //   bdate: '',
  //   category: '',
  // });

  // 글검색기능
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('search ====', e.target[0].value);

    axios
      .post('http://localhost:8008/searchList', {
        search: e.target[0].value,
      })
      .then((res) => {
        console.log('search1 ==>', res);
        const { data } = res;
        console.log('search2 ==>', data);
        // moveToSearch(data);
        setBoardlist({
          boardList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 카테고리기능
  const handlecategorySearch = (e) => {
    e.preventDefault();
    console.log('handlecategorySearch ====', searchCategoryRef.current.value);

    axios
      .post('http://localhost:8008/searchCategoryList', {
        category: searchCategoryRef.current.value,
      })
      .then((res) => {
        console.log('search1 ==>', res);
        const { data } = res;
        console.log('search2 ==>', data);

        setBoardlist({
          boardList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  //조회기능
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
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      <div align="center">
        <form onSubmit={handlecategorySearch}>
          <select name="board" size="6" ref={searchCategoryRef}>
            <option value="자유">자유게시판</option>
            <option value="리뷰">리뷰게시판</option>
            <option value="분양">분양게시판</option>
            <option value="분실">분실게시판</option>
            <option value="질문">Q&amp;A게시판</option>
          </select>
          <input classname="search" type="submit" value="카테고리검색"></input>
        </form>
      </div>
      <div>
        <BoardList boardlist={boardlist}></BoardList>
      </div>
      <div align="center">
        <form onSubmit={handleSearch}>
          <input
            classname="search"
            type="text"
            placeholder="관심있는 내용을 검색해보세요!"
            size="64"
          ></input>
          <input classname="search" type="submit" value="검색"></input>
        </form>
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
