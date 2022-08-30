import './MyFeedWrite';
import '../css/myFeedWrite.scss';
import { useRef, useState } from 'react';
import axios from 'axios';
import inputbt from '../icon/write.svg';

const MyFeedWrite = ({ handlelist }) => {
  const userid = window.sessionStorage.getItem('id');
  const writerRef = useRef();
  const secretRef = useRef();
  // const [secret, setSecret] = useState();
  var secret = 'Y';

  const onChange = (e) => {
    // console.log(e.target.value);
    secret = e.target.value;
    console.log(secret);
  };

  const handleInsert = () => {
    if (
      writerRef.current.value === '' ||
      writerRef.current.value === undefined
    ) {
      alert('일상을 입력하세요!!!');
      writerRef.current.focus();
      return false;
    }

    axios
      .post('http://localhost:8008/finsert', {
        userid,
        writer: writerRef.current.value,
        secret,
      })
      .then((res) => {
        console.log('handleInser=>', res);
        handlelist();
        writerRef.current.value = '';
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="feedWrite">
      <form className="feedWriteForm">
        <table className="feedWriteTable">
          <tr>
            <td>
              <input
                className="myfeedinput"
                type="text"
                name="writer"
                size="70"
                ref={writerRef}
                placeholder="나의 일상을 기록해보세요"
              ></input>{' '}
              &nbsp;
              <input
                align="center"
                className="writeInputbt"
                type="image"
                src={inputbt}
                alt="글쓰기"
                height="25px"
                onClick={handleInsert}
              ></input>
            </td>
            <td>
              <input
                type="radio"
                name="cs_open"
                id="cs_open"
                value="Y"
                class="radio"
                onChange={onChange}
              ></input>
              <span>공개</span>&nbsp;
              <input
                type="radio"
                name="cs_open"
                id="cs_open"
                value="N"
                class="radio"
                onChange={onChange}
              />
              <span>비공개</span>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default MyFeedWrite;
