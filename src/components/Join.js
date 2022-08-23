import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/login.scss';

const Join = () => {
  const [gender, setGender] = useState();
  const idRef = useRef();
  const pwRef = useRef();
  const nicknameRef = useRef();
  const checkpwRef = useRef();
  const telRef = useRef();
  const addrRef = useRef();
  const birthRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(gender);
  }, [gender]);

  const onChange = (e) => {
    setGender(e.target.value);
  };

  const handleMember = () => {
    if (idRef.current.value === '' || idRef.current.value === undefined) {
      alert('아이디를 입력하세요!!!');
      idRef.current.focus();
      return false;
    }
    if (pwRef.current.value === '' || pwRef.current.value === undefined) {
      alert('패스워드를 입력하세요!!!');
      pwRef.current.focus();
      return false;
    }
    if (
      checkpwRef.current.value === '' ||
      checkpwRef.current.value === undefined
    ) {
      alert('패스워드를 확인하세요!!!');
      checkpwRef.current.focus();
      return false;
    }
    if (
      nicknameRef.current.value === '' ||
      nicknameRef.current.value === undefined
    ) {
      alert('닉네임을 입력하세요!!!');
      nicknameRef.current.focus();
      return false;
    }
    if (telRef.current.value === '' || telRef.current.value === undefined) {
      alert('전화번호를 입력하세요!!!');
      telRef.current.focus();
      return false;
    }
    if (addrRef.current.value === '' || addrRef.current.value === undefined) {
      alert('주소를 입력하세요!!!');
      addrRef.current.focus();
      return false;
    }
    if (birthRef.current.value === '' || birthRef.current.value === undefined) {
      alert('생년월일을 입력하세요!!!');
      birthRef.current.focus();
      return false;
    }

    axios
      .post('http://localhost:8008/member', {
        id: idRef.current.value,
        pw: pwRef.current.value,
        checkpw: checkpwRef.current.value,
        nickname: nicknameRef.current.value,
        tel: telRef.current.value,
        addr: addrRef.current.value,
        birth: birthRef.current.value,
        gender: gender,
      })
      .then((res) => {
        console.log('handleMember =>', res);
        if (res.data.affectedRows === 1) alert('환영합니다!!');
        else alert('회원가입에 실패하였습니다.');
        navigate('/');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <p></p>
      <form>
        <table border="1" width="300px" align="center">
          <tr>
            <td width="100px">아이디</td>
            <td align="left" width="200px">
              <input
                type="text"
                name="id"
                size="20"
                defaultValue=""
                ref={idRef}
                placeholder="아이디를 입력하세요"
                required
              ></input>
            </td>
          </tr>
          <tr>
            <td width="100px">비밀번호</td>
            <td align="left" width="200px">
              <input
                type="password"
                name="pw"
                size="20"
                defaultValue=""
                ref={pwRef}
                placeholder="비밀번호를 입력하세요"
                required
              ></input>
            </td>
          </tr>
          <tr>
            <td width="100px">비밀번호 확인</td>
            <td align="left" width="200px">
              <input
                type="password"
                name="checkpw"
                size="20"
                defaultValue=""
                ref={checkpwRef}
                placeholder="비밀번호를 확인해주세요"
                required
              ></input>
            </td>
          </tr>
          <tr>
            <td width="100px">닉네임</td>
            <td align="left" width="200px">
              <input
                type="text"
                name="Nickname"
                size="20"
                defaultValue=""
                ref={nicknameRef}
                placeholder="닉네임을 입력하세요"
                required
              ></input>
            </td>
          </tr>
          <tr>
            <td width="100px">전화번호</td>
            <td align="left" width="200px">
              <input
                type="tel"
                name="tel"
                size="20"
                defaultValue=""
                ref={telRef}
                placeholder="전화번호를 입력하세요"
                required
              ></input>
            </td>
          </tr>
          <tr>
            <td width="100px">주소</td>
            <td align="left" width="200px">
              <select id="addr" ref={addrRef}>
                <option value="a">경기도</option>
                <option value="b">강원도</option>
                <option value="c">서울</option>
                <option value="d">부산</option>
                <option value="e">광주</option>
                <option value="f">대구</option>
                <option value="g">대전</option>
                <option value="h">충청도</option>
              </select>
            </td>
          </tr>
          <tr>
            <td width="100px">생년월일</td>
            <td align="left" width="200px">
              <input
                type="date"
                name="birth"
                size="20"
                defaultValue=""
                ref={birthRef}
                placeholder="생년월일을 입력하세요"
                required
              ></input>
            </td>
          </tr>
          <tr>
            <td width="100px">성별</td>
            <td align="left" width="200px">
              <input type="radio" name="gender" value="M" onChange={onChange} />
              <label>남성</label>
              <input type="radio" name="gender" value="F" onChange={onChange} />
              <label>여성</label>
            </td>
          </tr>
          <tr>
            <td colSpan="2" align="center">
              <input
                type="button"
                value="회원등록"
                onClick={handleMember}
              ></input>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default Join;
