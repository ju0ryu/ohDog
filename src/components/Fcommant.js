import '../css/Fcommant.scss';

const Fcommant = ({ article }) => {
  return (
    <div className="fcommant" width="400px">
      <form id={article.fnum} width="400px">
        <table className="fcommantlist" width="400px">
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
