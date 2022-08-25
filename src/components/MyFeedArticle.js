import axios from 'axios';
import deleteR from '../icon/deleteR.svg';

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
      <table border="1" width="100%">
        <td colSpan="2" align="right">
          <input
            type="image"
            src={deleteR}
            alt="삭제"
            height="20px"
            id={article.fnum}
            onClick={handleDelete}
          ></input>
        </td>
        <tr>
          <td width="20%">{article.userid} </td>
          <td> {article.fcomment}</td>
        </tr>
        <tr>
          <td colSpan="2" align="right">
            {article.fdate}
          </td>
        </tr>
        <tr></tr>
      </table>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default MyFeedArticle;
