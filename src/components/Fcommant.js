import '../css/Fcommant.scss';

const Fcommant = ({ article }) => {
  return (
    <div className="fcommant">
      <form id={article.fnum}>
        <table>
          <tr>
            <td>{article.userid}</td>
            <td>{article.fccontent}</td>
            <td>{article.fcdate}</td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default Fcommant;
