import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../../node_modules/axios/index';
import { useNavigate } from '../../../node_modules/react-router-dom/index';
import '../../css/boardupdate.scss';

const BoardUpdateForm = () => {
  const { state } = useLocation();
  console.log('updateState:', state);

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

  //삭제기능
  const handleDelete = (e) => {
    if (window.confirm('삭제하시겠습니까?')) {
      console.log('handleDelete(e.target.id) =>', e.target.id);
      axios
        .post('http://localhost:8008/delete', {
          num: e.target.id,
        })
        .then(() => {
          alert('삭제되었습니다');
          navigate('/board');
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      alert('삭제가 취소되었습니다.');
    }
  };

  //업데이트기능
  const handleUpdate = () => {
    if (window.confirm('수정하시겠습니까?')) {
      console.log('handleUpdate(data) =>', data);
      axios
        .post('http://localhost:8008/update', {
          data: data,
        })
        .then((res) => {
          alert('수정되었습니다.');
          console.log(
            'handleUpdate(res.data.changedRows) =>',
            res.data.changedRows,
          );
          navigate('/board');
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      alert('수정이 취소되었습니다.');
    }
  };

  return (
    <div className="boardUpdate">
      <p>글 수정</p>
      <form className="updateForm">
        <table className="updateTable">
          <tr className="updateCategory">
            <td width="100px">카테고리</td>
            <td align="left" width="600px">
              <p>{state[0].category}</p>
            </td>
          </tr>
          <tr className="updateTitle">
            <td width="120px">제목</td>
            <td align="left" width="600px">
              <input
                type="text"
                name="btitle"
                defaultValue={state[0].btitle}
                onChange={onChange}
              ></input>
            </td>
          </tr>
          <tr className="updateId">
            <td width="120px">작성자</td>
            <td align="left" width="600px">
              {state[0].userid}
            </td>
          </tr>
          <tr className="updateContent">
            <td width="120px ">글내용</td>
            <td align="left" width="600px">
              <input
                type="text"
                name="bcontent"
                defaultValue={state[0].bcontent}
                onChange={onChange}
              ></input>
            </td>
          </tr>
          <tr className="boardbtns">
            <td colspan="2" align="center">
              <input
                className="updateBoardBtn"
                type="button"
                value="글수정"
                onClick={handleUpdate}
              ></input>
              <input
                className="deleteBoardBtn"
                type="button"
                value="글삭제"
                id={state[0].boardnum}
                onClick={handleDelete}
              ></input>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default BoardUpdateForm;
