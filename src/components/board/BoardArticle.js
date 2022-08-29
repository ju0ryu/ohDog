import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from '../../../node_modules/react-router-dom/index';
import '../../css/boardarticle.scss';

const BoardArticle = ({ article }) => {
  console.log('BoardArticle =>', article);

  const navigate = useNavigate();
  const [boardLike, setBoardLike] = useState(false);

  //상세보기로 넘겨주기
  const handleDetail = (e) => {
    console.log('e.target.id', e.target.id);
    console.log('article.views', article.views);

    axios
      .all([
        axios.post('http://localhost:8008/boardUpdate', {
          boardnum: e.target.id,
          // views: article.views,
        }),
        axios.post('http://localhost:8008/detail', {
          boardnum: e.target.id,
        }),
      ])
      .then(
        axios.spread((res1, res2) => {
          console.log('res1개', res1, 'res2개', res2);
          const a = res1.data;
          console.log('첫번째데이터', a);

          const b = res2.data;
          console.log('두번째데이터 =>', b);
          // if (b.length > 0) {
          // }
          // moveToDetail(b);
          navigate('/detail', { state: b });
        }),
      )
      .catch((e) => {
        console.error(e);
      });
  };

  // const moveToDetail = (detail) => {
  //   navigate('/detail', { state: detail });
  // };
  const likeChange = () => {
    setBoardLike(!boardLike);
  };
  return (
    <tr className="boardTr">
      <td>{article.category}</td>
      <td>
        <a href="#" id={article.boardnum} onClick={handleDetail}>
          {article.btitle}
        </a>
      </td>
      <td className="articleId">
        <p>{article.userid}</p>
      </td>
      <td className="boardLike" onClick={likeChange}>
        {boardLike ? '♥' : '♡'}
      </td>
      <td>
        <p>{article.views}</p>
      </td>
    </tr>
  );
};

export default BoardArticle;
