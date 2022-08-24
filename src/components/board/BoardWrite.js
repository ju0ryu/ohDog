import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from '../../../node_modules/react-router-dom/index';

const BoardWrite = () => {
  const titleRef = useRef();
  const contentRef = useRef();
  const categoryRef = useRef();

  const navigate = useNavigate();

  const login_id = window.sessionStorage.getItem('id');
  console.log('id:', login_id);

  const handleInsert = () => {
    // if (categoryRef.current.value === undefined) {
    //   console.log('handleInsert =>', categoryRef.current.value);
    //   alert('카테고리를 선택하세요!!!');
    //   categoryRef.current.focus();
    //   return false;
    // }

    if (titleRef.current.value === '' || titleRef.current.value === undefined) {
      alert('제목을 입력하세요!!!');
      titleRef.current.focus();
      return false;
    }

    if (
      contentRef.current.value === '' ||
      contentRef.current.value === undefined
    ) {
      alert('내용을 입력하세요!!!');
      contentRef.current.focus();
      return false;
    }

    //글쓰기 기능
    axios
      .post('http://localhost:8008/insert', {
        title: titleRef.current.value,
        writer: login_id,
        content: contentRef.current.value,
        category: categoryRef.current.value,
      })
      .then((res) => {
        console.log('handleInsert1 =>', categoryRef.current.value);
        console.log('handleInsert2 =>', res);

        titleRef.current.value = '';
        contentRef.current.value = '';
        categoryRef.current.value = '';
        console.log('handleInsert3 =>', categoryRef.current.value);
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
            <td width="100px">카테고리</td>
            <td align="left" width="550px">
              <select name="board" size="6" ref={categoryRef}>
                <option value="자유">자유게시판</option>
                <option value="리뷰">리뷰게시판</option>
                <option value="분양">분양게시판</option>
                <option value="분실">분실게시판</option>
                <option value="질문">질문게시판</option>
              </select>
            </td>
          </tr>
          <tr>
            <td width="100px">제목</td>
            <td align="left" width="550px">
              <input
                type="text"
                name="title"
                size="68"
                ref={titleRef}
                placeholder="제목을 입력하세요"
              ></input>
            </td>
          </tr>
          <tr>
            <td width="100px">글쓴이</td>
            <td align="left" width="550px">
              <td>{login_id}</td>
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td align="left">
              <textarea
                rows="5"
                cols="70"
                name="content"
                ref={contentRef}
                placeholder="내용을 입력하세요"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td colSpan="2" align="center">
              <input
                type="button"
                value="글쓰기"
                onClick={handleInsert}
              ></input>
              &nbsp;
              <input type="reset" value="취소"></input>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default BoardWrite;
