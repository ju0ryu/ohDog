import '../../css/boardcomment.scss';

const oneDay = 1000 * 60 * 60 * 24;

function makeTwoDigits(time) {
  return time.toString().length !== 2 ? `0${time}` : time;
}

function makeFeedTime(timestamp) {
  console.log('timestamp:', timestamp);
  const feedDate = new Date(timestamp);
  const nowDate = Date.now(); // 현재시간
  const milTime = feedDate.getTime();
  const timeGap = nowDate - milTime;
  const date = parseInt(timeGap / oneDay);
  console.log(
    'feedDate :',
    feedDate,
    'nowDate :',
    nowDate,
    'milTime : ',
    milTime,
    'timeGap : ',
    timeGap,
    'oneDay : ',
    oneDay,
    'date : ',
    date,
  );
  //nowDate - timestamp > 24 어제
  const hour = feedDate.getHours();
  const minutes = feedDate.getMinutes();

  return `${hour > 12 ? '오후' : '오전'} 
    ${hour > 12 ? makeTwoDigits(hour - 12) : makeTwoDigits(hour)}:
    ${makeTwoDigits(minutes)},
    ${date === 0 ? '오늘' : date === 1 ? '어제' : `${date}일전`}`;
}

const BoardComment = ({ article }) => {
  const login_id = window.sessionStorage.getItem('id');

  if (login_id === article.userid) {
    return (
      <div className="bcomments">
        <form className="bcForm" id={article.bcnum}>
          <table className="bcommentlist">
            <tr>
              <td className="bidbox">{article.userid}</td>
              <td className="bcbox">{article.bccontent}</td>
              <td className="bdatebox">
                <p>{makeFeedTime(article.bcdate)}</p>
              </td>
            </tr>
          </table>
        </form>
      </div>
    );
  } else {
    return (
      <div className="bcomments">
        <form className="bcForm" id={article.bcnum}>
          <table className="bcommentlist">
            <tr>
              <td className="bidbox">{article.userid}</td>
              <td className="bcbox">{article.bccontent}</td>
              <td className="bdatebox">
                <p>{makeFeedTime(article.bcdate)}</p>
              </td>
            </tr>
          </table>
        </form>
      </div>
    );
  }
};

export default BoardComment;
