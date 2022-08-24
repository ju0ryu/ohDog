import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../../node_modules/axios/index';
import { useNavigate } from '../../../node_modules/react-router-dom/index';

const BoardUpdateForm = () => {
  const { state } = useLocation();
  console.log('updateState:', state);

  const login_id = window.sessionStorage.getItem('id');
  console.log('id:', login_id);

  const navigate = useNavigate();

  const [data, setData] = useState({
    boardnum: state[0].boardnum,
    userid: state[0].userid,
    btitle: state[0].btitle,
    bcontent: state[0].bcontent,
    bdate: state[0].bdate,
    category: state[0].category,
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    console.log('handleUpdate =>', data);
    axios
      .post('http://localhost:8008/update', {
        data: data,
      })
      .then((res) => {
        console.log('handleUpdate( changedRows) =>', res.data.changedRows);
        navigate('/board');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <form>
        <table border="1" width="700px" align="center">
          <tr>
            <td width="100px">제목</td>
            <td align="left" width="600px">
              <input
                type="text"
                name="btitle"
                defaultValue={state[0].btitle}
                onChange={onChange}
              ></input>
            </td>
          </tr>
          <tr>
            <td width="100px">글쓴이</td>
            <td align="left" width="600px">
              {state[0].userid}
            </td>
          </tr>
          <tr>
            <td width="100px">글내용</td>
            <td align="left" width="600px">
              <input
                type="text"
                name="bcontent"
                defaultValue={state[0].bcontent}
                onChange={onChange}
              ></input>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <input
                type="button"
                value="글수정"
                onClick={handleUpdate}
              ></input>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default BoardUpdateForm;
