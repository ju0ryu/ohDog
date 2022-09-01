import React, { useEffect, useRef } from 'react';
import '../../css/board.scss';
import { Link } from 'react-router-dom';
import BoardList from './BoardList';
import { useState } from 'react';
import axios from 'axios';

function Board() {
  const [countboard, setCountBoard] = useState(0);
  const [categoryboard, setCategoryBoard] = useState('전체');
  console.log('categoryboard()', categoryboard);
  const [boardlist, setBoardlist] = useState({
    boardList: [],
  });

  const searchCategoryRef = useRef();

  //전체글보기 버튼기능
  const allList = () => {
    axios
      .get('http://localhost:8008/list', {})
      .then((res) => {
        console.log('list(res) ==>', res);
        const { data } = res;
        console.log('list(data) ==>', data);
        setBoardlist({
          boardList: data,
        });
        console.log('list(boardlist.boardList) ==>', boardlist);
        setCountBoard({
          countBoard: data.length,
        });
        setCategoryBoard('전체');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 글검색기능
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('handleSearch(e.target[0].value)', e.target[0].value);

    axios
      .post('http://localhost:8008/searchList', {
        search: e.target[0].value,
      })
      .then((res) => {
        console.log('handleSearch(res) ==>', res);
        const { data } = res;
        console.log('handleSearch(data) ==>', data);
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
        console.log('handlecategorySearch(res) ==>', res);
        const { data } = res;
        console.log('handlecategorySearch2(data) ==>', data);

        setBoardlist({
          boardList: data,
        });
        setCountBoard({
          countBoard: data.length,
        });
        console.log('handlecategorySearch(countboard) ==>', countboard);
        setCategoryBoard({
          categoryBoard: searchCategoryRef.current.value,
        });
        console.log('handlecategorySearch(categoryboard) ==>', categoryboard);
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
        console.log('list(res) ==>', res);
        const { data } = res;
        console.log('list(data) ==>', data);
        console.log('list(data.length) ==>', data.length);
        setBoardlist({
          boardList: data,
        });

        setCountBoard({
          countBoard: data.length,
        });
        console.log('list(countboard) ==>', countboard);
      })

      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      <div className="boardTop">
        <div className="boardheaders">
          <p>게시판</p>
        </div>
        <div className="boardSearch">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="관심있는 내용을 검색해보세요!"
              size="64"
            ></input>
            <input className="searchSubmit" type="submit" value="검색"></input>
          </form>
        </div>
        <div className="searchCategory">
          <form onSubmit={handlecategorySearch}>
            <select
              className="searchCategoryList"
              name="board"
              size="5"
              ref={searchCategoryRef}
              // onClick={handlecategorySearch}
            >
              <option value="">카테고리선택</option>
              <option onClick={handlecategorySearch} value="자유">
                자유게시판
              </option>
              <option onClick={handlecategorySearch} value="동물병원">
                동물병원
              </option>
              <option onClick={handlecategorySearch} value="분양">
                분양게시판
              </option>
              <option onClick={handlecategorySearch} value="분실">
                분실게시판
              </option>
              <option onClick={handlecategorySearch} value="Q&A">
                Q&amp;A게시판
              </option>
            </select>
            {/* <input
              className="searchCategoryList"
              type="submit"
              value="카테고리검색"
            ></input> */}
          </form>
          <button onClick={allList} className="searchCategoryList">
            전체글보기
          </button>
          <Link to="/insert">
            <button className="searchCategoryList">글쓰기</button>
          </Link>
        </div>
      </div>

      <div>
        <p>
          {categoryboard === '전체'
            ? categoryboard
            : categoryboard.categoryBoard}
          &nbsp;
          {countboard.countBoard}개의 글
        </p>
      </div>

      <div>
        <BoardList boardlist={boardlist}></BoardList>
      </div>
    </>
  );
}
export default Board;
