import axios from 'axios';

const BoardArticle = ({ article, handlelist }) => {
  console.log('BoardArticle =>', article);

  return (
    <tr>
      <td>{article.boardnum}</td>
      <td>{article.category}</td>
      <td>
        <a href="#" id={article.boardnum} onClick={''}>
          {article.btitle}
        </a>
      </td>
      <td>좋아요</td>
      <td>미정</td>
    </tr>
  );
};

export default BoardArticle;
