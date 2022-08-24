import axios from 'axios';
import { useNavigate } from '../../../node_modules/react-router-dom/index';

const BoardArticle = ({ article }) => {
  console.log('BoardArticle =>', article);
  const navigate = useNavigate();

  //상세보기로 넘겨주기
  const handleDetail = (e) => {
    console.log(e.target.id);

    axios
      .post('http://localhost:8008/detail', { num: e.target.id })
      .then((res) => {
        const { data } = res;
        console.log('detail =>', data);
        if (res.data.length > 0) {
          moveToDetail(data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const moveToDetail = (detail) => {
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
