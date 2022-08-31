import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from '../../../node_modules/react-router-dom/index';
import '../../css/boardwrite.scss';

const BoardWrite = () => {
  const titleRef = useRef();
  const contentRef = useRef();
  const categoryRef = useRef();

  const navigate = useNavigate();

  const login_id = window.sessionStorage.getItem('id');
  console.log('id:', login_id);

  const handleInsert = () => {
    console.log('handleInsert =>', categoryRef.current.value);
    if (categoryRef.current.value === '') {
      alert('카테고리를 선택하세요!!!');
      categoryRef.current.focus();
      return false;
    }

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

  //나가기 기능
  const handleOut = () => {
    if (window.confirm('글 작성을 취소하시겠습니까?')) {
      navigate('/board');
    } else {
      alert('취소되었습니다.');
    }
  };

  return (
    <div className="boardWrite">
      <p>글쓰기</p>
      <form className="writeForm">
        <table className="writeTable" border="1" width="700px" align="center">
          <tr>
            <td width="100px">카테고리</td>
            <td align="left" width="550px">
              <select className="boardSelect" name="board" ref={categoryRef}>
                <option value="">카테고리선택</option>
                <option value="자유">자유게시판</option>
                <option value="동물병원">동물병원게시판</option>
                <option value="분양">분양게시판</option>
                <option value="분실">분실게시판</option>
                <option value="Q&A">Q&A게시판</option>
              </select>
            </td>
          </tr>
          <tr>
            <td width="100px">글쓴이</td>
            <td align="left" width="550px">
              <td>
                <p>{login_id}</p>
              </td>
            </td>
          </tr>
          <tr>
            <td width="100px">제목</td>
            <td className="writeTitle" align="left" width="550px">
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
            <td>내용</td>
            <td className="writeContent" align="left">
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
                className="writeUpdate"
                type="button"
                value="글쓰기"
                onClick={handleInsert}
              ></input>
              &nbsp;
              <input
                className="writeDelete"
                type="button"
                value="취소"
                onClick={handleOut}
              ></input>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default BoardWrite;
