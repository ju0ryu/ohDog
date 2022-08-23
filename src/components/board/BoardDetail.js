import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const BoardDetail = () => {
  const { state } = useLocation();
  console.log('state1:', state);
  const login_id = window.sessionStorage.getItem('id');
  console.log('id:', login_id);

  if (login_id === state[0].userid) {
    return (
      <div>
        <form>
          <table border="1" width="700px" align="center">
            <tr>
              <td width="100px">글번호</td>
              <td align="left" width="600px">
                {state[0].boardnum}번글
              </td>
            </tr>
            <tr>
              <td width="100px">제목</td>
              <td align="left" width="600px">
                {state[0].btitle}
              </td>
            </tr>
            <tr>
              <td width="100px">글쓴이</td>
              <td align="left" width="600px">
                {state[0].userid}
              </td>
            </tr>
            <tr>
              <td width="100px">글쓴날짜</td>
              <td align="left" width="600px">
                {state[0].bdate}
              </td>
            </tr>
            <tr>
              <td width="100px">글내용</td>
              <td align="left" width="600px">
                {state[0].bcontent}
              </td>
            </tr>
          </table>
          <div align="center">
            <input type="text" placeholder=" 댓글을 남겨주세요"></input>
            <button>등록</button>
          </div>
          <div align="center">
            <Link to="/update">
              <input type="button" value="글 수정"></input>
            </Link>
            {/* 온클릭으로 해야함 */}
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <form>
          <table border="1" width="700px" align="center">
            <tr>
              <td width="100px">글번호</td>
              <td align="left" width="600px">
                {state[0].boardnum}번글
              </td>
            </tr>
            <tr>
              <td width="100px">제목</td>
              <td align="left" width="600px">
                {state[0].btitle}
              </td>
            </tr>
            <tr>
              <td width="100px">글쓴이</td>
              <td align="left" width="600px">
                {state[0].userid}
              </td>
            </tr>
            <tr>
              <td width="100px">글쓴날짜</td>
              <td align="left" width="600px">
                {state[0].bdate}
              </td>
            </tr>
            <tr>
              <td width="100px">글내용</td>
              <td align="left" width="600px">
                {state[0].bcontent}
              </td>
            </tr>
          </table>
          <div align="center">
            <input type="text" placeholder=" 댓글을 남겨주세요"></input>
            <button>등록</button>
          </div>
        </form>
      </div>
    );
  }
};

export default BoardDetail;
