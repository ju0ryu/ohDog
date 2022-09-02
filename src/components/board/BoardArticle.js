import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from '../../../node_modules/react-router-dom/index';
import '../../css/boardarticle.scss';

const BoardArticle = ({ article }) => {
  const navigate = useNavigate();
  const [boardLike, setBoardLike] = useState(article.likeck);
  const loginId = window.sessionStorage.getItem('id');
  const [likeCheck, setLikeCheck] = useState({
    luserid: '',
    lnum: '',
    likeck: '',
  });

  // console.log('BoardArticle =>', boardLike);

  //상세보기로 넘겨주기
  const handleDetail = (e) => {
    // console.log('e.target.id', e.target.id);
    // console.log('article.views', article.views);

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
          // console.log('res1개', res1, 'res2개', res2);
          const a = res1.data;
          // console.log('첫번째데이터', a);

          const b = res2.data;
          // console.log('두번째데이터 =>', b);
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

  // useEffect(() => {
  //   axios
  //     .post('http://localhost:8008/boardliklist', {
  //       loginId,
  //     })
  //     .then((res) => {
  //       const { data } = res;
  //       // console.log('boardliklist', data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [boardLike]);

  const likeChange = (e) => {
    // console.log('좋아요 체크 : ', e.target.value);
    setBoardLike(!boardLike);
    console.log('boardLike 확인 : ', boardLike);
    axios
      .post('http://localhost:8008/likelist', {
        loginId,
        lnum: e.target.id,
      })
      .then((res) => {
        console.log('좋아요 리스트 :', res);
        const { data } = res;
        console.log('data.length :', data[0]);
        if (data.length == 0) {
          console.log('if enter');
          axios
            .post('http://localhost:8008/likeinsert', {
              loginId,
              lnum: e.target.id,
              likeck: true,
            })
            .then((res) => {
              console.log('좋아요 등록 :', res);
            });
        } else {
          console.log('boardlike check :', data[0].likeck);
          axios
            .post('http://localhost:8008/likeupdate', {
              loginId,
              lnum: e.target.id,
              likeck: data[0].likeck == null ? 1 : null,
            })
            .then((res) => {
              const { data } = res;
              // console.log('좋아요 수정 :', data);
            });
        }
      });
    // window.location.reload();
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
      <td className="boardLike">
        <input
          onClick={likeChange}
          id={article.boardnum}
          type="button"
          // value={article.likeck == 1 ? '♥' : '♡'}
          value={article.luserid == loginId && boardLike == 1 ? '♥' : '♡'}
        />
      </td>
      <td>
        <p>{article.views}</p>
      </td>
    </tr>
  );
};

export default BoardArticle;
