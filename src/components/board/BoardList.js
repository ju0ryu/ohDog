import BoardArticle from './BoardArticle';

const BoardList = ({ boardlist }) => {
  // useEffect(() => {
  //   handlelist();
  // }, []);

  if (boardlist.boardList.length === 0) {
    return (
      <div>
        <table width="900px" border="1" align="center">
          <thead>
            <tr>
              <th width="60">번호</th>
              <th width="100">카테고리</th>
              <th width="300">제목</th>
              <th width="60">좋아요</th>
              <th width="60">미정</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <table width="900px" border="1" align="center">
          <thead>
            <tr>
              <th width="60">번호</th>
              <th width="100">카테고리</th>
              <th width="300">제목</th>
              <th width="60">좋아요</th>
              <th width="60">미정</th>
            </tr>
          </thead>
          <tbody>
            {boardlist.boardList.map((article) => {
              return <BoardArticle article={article} key={article.boardnum} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default BoardList;
