import '../css/Fcommant.scss';

const Fcommant = ({ article }) => {
  return (
    <div className="fcommant">
      <form id={article.fnum}>
        <table className="fcommantlist" width="400px" align="center">
          <tr>
            <td className="idbox" width="20%">
              {article.userid}
            </td>
            <td className="fccbox" width="50%">
              {article.fccontent}
            </td>
            <td width="30%">{article.fcdate}</td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default Fcommant;
