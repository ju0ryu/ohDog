import axios from 'axios';

const MyFeedArticle = ({ article, handlelist }) => {
  const handleDelete = (e) => {
    console.log('handleDelete(fnum):', e.target.id);
    axios
      .post('http://localhost:8008/fdelete', {
        fnum: e.target.id,
      })
      .then(() => {
        handlelist();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <td align="right">
        <input
          type="button"
          value="삭제"
          id={article.fnum}
          onClick={handleDelete}
        ></input>
      </td>
      <tr>
        <td>
          {article.userid} : {article.fcomment}
        </td>
      </tr>
      <tr>
        <td align="right">{article.fdate}</td>
      </tr>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default MyFeedArticle;
