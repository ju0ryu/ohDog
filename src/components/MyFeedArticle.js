import axios from 'axios';
import deleteR from '../icon/deleteR.svg';
import '../css/myFeedArticle.scss';

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
    <div className="fcommantbox" height="300px">
      <table className="fclistbox">
        <tr>
          <td colSpan="4" align="right">
            <input
              type="image"
              src={deleteR}
              alt="삭제"
              height="20px"
              id={article.fnum}
              onClick={handleDelete}
            ></input>
          </td>
          <td width="10px"></td>
        </tr>
        <tr>
          <td width="10px"></td>
          <td className="userid">{article.userid} </td>
          <td width="10px"></td>
          <td className="fcomment">{article.fcomment}</td>
        </tr>
        <tr>
          <td className="fdate" colSpan="4" align="right">
            {article.fdate}&nbsp;
          </td>
          <td width="10px"></td>
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
