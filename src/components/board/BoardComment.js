const BoardComment = ({ article }) => {
  const login_id = window.sessionStorage.getItem('id');

  if (login_id === article.userid) {
    return (
      <div className="fcommant" width="400px">
        <form id={article.bcnum} width="400px">
          <table className="fcommantlist" width="400px">
            <tr>
              <td className="idbox" width="20%">
                {article.userid} 작성자
              </td>
              <td className="fccbox" width="50%">
                {article.bccontent}
              </td>
              <td width="30%">{article.bcdate}</td>
            </tr>
          </table>
        </form>
      </div>
    );
  } else {
    return (
      <div className="fcommant" width="400px">
        <form id={article.bcnum} width="400px">
          <table className="fcommantlist" width="400px">
            <tr>
              <td className="idbox" width="20%">
                {article.userid}
              </td>
              <td className="fccbox" width="50%">
                {article.bccontent}
              </td>
              <td width="30%">{article.bcdate}</td>
            </tr>
          </table>
        </form>
      </div>
    );
  }
};

export default BoardComment;
