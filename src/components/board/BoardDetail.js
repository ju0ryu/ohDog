import { useLocation } from 'react-router';

const BoardDetail = ({}) => {
  const Edit = () => {
    const { state } = useLocation();
    console.log('state:', state);
  };
  return (
    <div>
      <form>
        <table border="1" width="700px" align="center">
          <tr>
            <td width="100px">글번호</td>
            <td align="left" width="600px">
              {}
            </td>
          </tr>
          <tr>
            <td width="100px">제목</td>
            <td align="left" width="600px">
              {}
            </td>
          </tr>
          <tr>
            <td width="100px">글쓴이</td>
            <td align="left" width="600px">
              {}
            </td>
          </tr>
          <tr>
            <td width="100px">글쓴날짜</td>
            <td align="left" width="600px">
              {}
            </td>
          </tr>
          <tr>
            <td width="100px">글내용</td>
            <td align="left" width="600px">
              {}
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <input type="button" value="글목록"></input>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default BoardDetail;
