import axios from 'axios';
import deleteR from '../icon/deleteR.svg';
import '../css/myFeedArticle.scss';

const oneDay = 1000 * 60 * 60 * 24;

function makeTwoDigits(time) {
  return time.toString().length !== 2 ? `0${time}` : time;
}

function makeFeedTime(timestamp) {
  // console.log('timestamp:', timestamp);
  const feedDate = new Date(timestamp);
  const nowDate = Date.now(); // 현재시간
  const milTime = feedDate.getTime();
  const timeGap = nowDate - milTime;
  // console.log('timeGap', timeGap);
  const date = parseInt(timeGap / oneDay);
  //nowDate - timestamp > 24 어제
  const hour = feedDate.getHours();
  const minutes = feedDate.getMinutes();

  return `${hour > 12 ? '오후' : '오전'} 
    ${hour > 12 ? makeTwoDigits(hour - 12) : makeTwoDigits(hour)}:
    ${makeTwoDigits(minutes)},
    ${date === 0 ? '오늘' : date === 1 ? '어제' : `${date}일전`}`;
}

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
    <div className="fcommentbox">
      <table className="fclistbox">
        <tr>
          <td className="mfDelete" colSpan="4">
            <input
              className="mfDeleteBtn"
              type="image"
              src={deleteR}
              alt="삭제"
              id={article.fnum}
              onClick={handleDelete}
            ></input>
          </td>
        </tr>
        <tr className="mfArticleBox">
          <td className="userid">{article.userid} </td>
          <td colSpan="4" align="center" className="fcomment">
            {article.fcomment}
          </td>
          <td className="mfdate">{makeFeedTime(article.fdate)}&nbsp;</td>
        </tr>
        <tr></tr>
      </table>
    </div>
  );
};

export default MyFeedArticle;
