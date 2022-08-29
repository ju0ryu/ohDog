import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from '../../../node_modules/axios/index';
import { useNavigate } from '../../../node_modules/react-router-dom/index';
import BoardComment from './BoardComment';

const BoardDetail = () => {
  const { state } = useLocation();
  const login_id = window.sessionStorage.getItem('id');
  const boardCommentRef = useRef();

  console.log('login_id:', login_id);
  console.log('BoardDetail(state)', state);

  const navigate = useNavigate();

  const [boardComment, setBoardComment] = useState({
    BoardComment: [],
  });

  //업데이트폼으로 넘겨주기
  const handleUpdateForm = (e) => {
    console.log('handleUpdateForm', e.target.id);
    axios
      .post('http://localhost:8008/detail', { boardnum: e.target.id })
      .then((res) => {
        const { data } = res;
        console.log('handleUpdateForm(data)', data);
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

  //댓글 조회기능
  useEffect(() => {
    axios
      .post('http://localhost:8008/boardCommentList', {
        boardnum: state[0].boardnum,
      })
      .then((res) => {
        console.log('res ==>', res);
        const { data } = res;
        console.log('data ==>', data);
        setBoardComment({
          BoardComment: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  //댓글조회
  const onClick = () => {
    // e.preventDefault();
    console.log('e.target.id =>', state[0].boardnum);
    axios
      .post('http://localhost:8008/boardCommentList', {
        boardnum: state[0].boardnum,
      })
      .then((res) => {
        const { data } = res;
        console.log('boardCommentList(data) : ', data);
        setBoardComment({
          BoardComment: data,
        });
        console.log('useState(boardComment)', boardComment);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  //댓글기능
  const boardInsert = (e) => {
    // e.preventDefault();
    console.log('boardInsert(e)', e);
    console.log(
      'boardInsert(boardCommentRef.current.value)',
      boardCommentRef.current.value,
    );
    console.log(e.target.id);
    axios
      .post('http://localhost:8008/boardCommentInsert', {
        boardnum: state[0].boardnum,
        userid: login_id,
        bccontent: boardCommentRef.current.value,
      })
      .then((res) => {
        console.log('boardInsert(res)', res);
        boardCommentRef.current.value = '';
        onClick(e);
        console.log('boardComment.BoardComment', boardComment.BoardComment);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if (login_id === state[0].userid) {
    return (
      <>
        <div>
          <table border="1" width="700px" align="center">
            <tr>
              <td align="left" width="600px">
                <p>카테고리 &gt;&nbsp;{state[0].category}</p>
              </td>
            </tr>
            <tr>
              <td align="left" width="600px">
                <p>{state[0].btitle}</p>
              </td>
            </tr>
            <tr>
              <td align="left" width="600px">
                <p> {state[0].userid}</p>
              </td>
            </tr>
            <tr>
              <td align="left" width="600px">
                <p>{state[0].bdate}</p>
                <p>{state[0].views}</p>
              </td>
            </tr>
            <tr>
              <td align="left" width="600px">
                <p>{state[0].bcontent}</p>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <form>
            <div align="center">
              <input
                type="button"
                id={state[0].boardnum}
                value="글수정"
                onClick={handleUpdateForm}
              ></input>
            </div>

            <div align="center">
              <input
                className="fcinput"
                type="text"
                name="comment"
                ref={boardCommentRef}
                size="40"
                defaultValue=""
                placeholder="댓글을 남겨주세요."
              />
              <input type="button" onClick={boardInsert} value="등록"></input>
            </div>
          </form>
        </div>
        <div align="center" className="fclist">
          {boardComment.BoardComment.map((article) => {
            return <BoardComment article={article} />;
          })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <table border="1" width="700px" align="center">
            <tr>
              <td align="left" width="600px">
                <p>카테고리 &gt;&nbsp;{state[0].category}</p>
              </td>
            </tr>
            <tr>
              <td align="left" width="600px">
                <p>{state[0].btitle}</p>
              </td>
            </tr>
            <tr>
              <td align="left" width="600px">
                <p> {state[0].userid}</p>
              </td>
            </tr>
            <tr>
              <td align="left" width="600px">
                <p>{state[0].bdate}</p>
                <p>{state[0].views}</p>
              </td>
            </tr>
            <tr>
              <td align="left" width="600px">
                <p>{state[0].bcontent}</p>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <form>
            <div align="center">
              <input
                className="fcinput"
                type="text"
                name="comment"
                ref={boardCommentRef}
                size="40"
                defaultValue=""
                placeholder="댓글을 남겨주세요."
              />
              <input type="button" onClick={boardInsert} value="등록"></input>
            </div>
          </form>
        </div>
        <div align="center" className="fclist">
          {boardComment.BoardComment.map((article) => {
            return <BoardComment article={article} />;
          })}
        </div>
      </>
    );
  }
};

export default BoardDetail;
