import '../css/Fcommant.scss';

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

const Fcommant = ({ article }) => {
  return (
    <div className="fcomment" width="700px">
      <form className="fcommentForm" align="center" id={article.fnum}>
        <table className="fcommentTable" width="500px" align="center">
          <tr>
            <td className="idbox">{article.userid}</td>
            <td width="10px"></td>
            <td className="fccbox" align="left">
              {article.fccontent}
            </td>
            <td className="fcdbox" align="right">
              {makeFeedTime(article.fcdate)}
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default Fcommant;
