import { useLocation } from 'react-router';
import axios from '../../../node_modules/axios/index';
import { useNavigate } from '../../../node_modules/react-router-dom/index';

const BoardDetail = () => {
  const { state } = useLocation();
  const login_id = window.sessionStorage.getItem('id');

  console.log('id:', login_id);
  console.log('state 111:', state);

  const navigate = useNavigate();

  //업데이트폼으로 넘겨주기
  const handleUpdateForm = (e) => {
    axios
      .post('http://localhost:8008/detail', { num: e.target.id })
      .then((res) => {
        const { data } = res;
        console.log('updatedetail2=>', data);
        if (res.data.length > 0) {
          moveToUpdate(data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const moveToUpdate = (updateDetail) => {
    navigate('/update', { state: updateDetail });
  };
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
            <input
              type="button"
              id={state[0].boardnum}
              value="수정"
              onClick={handleUpdateForm}
            ></input>
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
