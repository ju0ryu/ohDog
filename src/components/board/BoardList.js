import BoardArticle from './BoardArticle';
import { useState } from 'react';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';
import '../../css/boardlist.scss';

const BoardList = ({ boardlist }) => {
  // 페이지 넘기기 기능
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(15);
  console.log('boardlist 확인 : ', boardlist);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const itemChange = (e) => {
    setItems(Number(e.target.value));
  };

  console.log('itemspage', items * (page - 1), items * (page - 1) + items);

  // 리턴값
  if (boardlist.boardList.length === 0) {
    return (
      <div className="boardList">
        <table width="900px" border="1" align="center">
          <thead>
            <tr>
              <th width="60">카테고리</th>
              <th width="300">제목</th>
              <th width="100">작성자</th>
              <th width="60">좋아요</th>
              <th width="60">조회수</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  } else {
    return (
      <>
        {' '}
        {/* <div>
          <div>
            <select name="items" onChange={itemChange}>
              <option value="5">5개</option>
              <option value="10">10개</option>
              <option value="15">15개</option>
              <option value="20">20개</option>
            </select>
          </div>
        </div> */}
        <div className="boardList">
          <table className="boardTable">
            <thead>
              <tr>
                <th width="60">카테고리</th>
                <th width="300">제목</th>
                <th width="100">작성자</th>
                <th width="60">좋아요</th>
                <th width="60">조회수</th>
              </tr>
            </thead>
            <tbody>
              {boardlist.boardList
                .slice(items * (page - 1), items * (page - 1) + items)
                .map((article) => {
                  return (
                    <BoardArticle article={article} key={article.boardnum} />
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="tablePage">
          <PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={items}
              totalItemsCount={boardlist.boardList.length - 1}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            ></Pagination>
          </PaginationBox>
        </div>
      </>
    );
  }
};

//페이지 넘기기 스타일
const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

export default BoardList;
