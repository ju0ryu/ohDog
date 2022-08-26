import '../css/Fcommant.scss';

const Fcommant = ({ article }) => {
  return (
    <div className="fcommant" width="700px">
      <form align="center" id={article.fnum}>
        <table className="fcommantlist" width="500px" align="center">
          <tr>
            <td width="40px"></td>
            <td className="idbox">{article.userid}</td>
            <td width="10px"></td>
            <td className="fccbox" align="left">
              {article.fccontent}
            </td>
            <td className="fcdbox" align="right">
              {article.fcdate}
            </td>
            <td width="40px"></td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default Fcommant;
