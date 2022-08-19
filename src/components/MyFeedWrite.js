import './MyFeedWrite';
import '../css/myFeedWrite.scss';
import { useRef, useState } from 'react';
import axios from 'axios';

const MyFeedWrite = ({ handlelist }) => {
  const userid = 'userid 01';
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
        userid = 'userid 01';
        writerRef.current.value = '';
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
            <td align="left" width="550px">
              <input
                type="text"
                name="writer"
                size="68"
                ref={writerRef}
                placeholder="일상을 입력하세요"
              ></input>{' '}
              <input
                type="button"
                value="글쓰기"
                onClick={handleInsert}
              ></input>
              <input
                type="radio"
                name="cs_open"
                id="cs_open"
                value="Y"
                class="radio"
                onChange={onChange}
              ></input>
              <span>공개</span>&nbsp;&nbsp;
              <input
                type="radio"
                name="cs_open"
                id="cs_open"
                value="N"
                class="radio"
                onChange={onChange}
              />
              <span>비공개</span>&nbsp;
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default MyFeedWrite;
