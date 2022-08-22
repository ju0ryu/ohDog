import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from '../../../node_modules/react-router-dom/index';

const BoardArticle = ({ article }) => {
  console.log('BoardArticle =>', article);

  const [detail, setDetail] = useState({
    boardnum: 0,
    userid: '',
    btitle: '',
    bcontent: '',
    bdate: '',
    category: '',
  });

  const navigate = useNavigate();

  const handleDetail = (e) => {
    console.log(e.target.id);

    axios
      .post('http://localhost:8008/detail', { num: e.target.id })
      .then((res) => {
        const { data } = res;
        console.log('detail =>', data);
        if (res.data.length > 0) {
          setDetail({
            ...detail,
            boardnum: data[0].boardnum,
            userid: data[0].userid,
            btitle: data[0].btitle,
            bcontent: data[0].bcontent,
            bdate: data[0].bdate,
            category: data[0].category,
          });
          return changePage(detail);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const changePage = (detail) => {
    console.log('detail :', detail);
    navigate('/detail', { state: detail });
  };
  return (
    <tr>
      <td>{article.boardnum}</td>
      <td>{article.category}</td>
      <td>
        <a href="#" id={article.boardnum} onClick={handleDetail}>
          {article.btitle}
        </a>
      </td>
      <td>좋아요</td>
      <td>미정</td>
    </tr>
  );
};

export default BoardArticle;
