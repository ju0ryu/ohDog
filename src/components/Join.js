import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/login.scss';
import PopupPostCode from './PopupPostCode';
import PopupDom from './PopupDom';

const Join = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState();
  const [gender, setGender] = useState();
  const idRef = useRef();
  const pwRef = useRef();
  const nicknameRef = useRef();
  const checkpwRef = useRef();
  const telRef = useRef();
  const addrRef = useRef();
  const addr2Ref = useRef();
  const birthRef = useRef();

  const navigate = useNavigate();

  const checkid = () => {
    console.log('idref :', idRef.current.value);
    axios
      .get('http://localhost:8008/memberlist', {})
      .then((res) => {
        console.log(res);
        const { data } = res;
        console.log(data);
        handleMember(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checknickname = () => {
    console.log('checknickname :', nicknameRef.current.value);
    axios
      .get('http://localhost:8008/memberlist', {})
      .then((res) => {
        console.log(res);
        const { data } = res;
        console.log(data);
        handleMember(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(gender);
  }, [gender]);

  const onChange = (e) => {
    setGender(e.target.value);
  };

  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const handleMember = (data) => {
    if (idRef.current.value === '' || idRef.current.value === undefined) {
      alert('아이디를 입력하세요!!!');
      idRef.current.focus();
      return false;
    } else {
      for (var i = 0; i < data.length; i++) {
        console.log(i);
        if (data[i].userid == idRef.current.value) {
          alert('중복된 아이디입니다.');
          idRef.current.focus();
          return false;
        }
      }
      if (1) {
        alert('사용가능');
      }
    }
    if (pwRef.current.value === '' || pwRef.current.value === undefined) {
      alert('패스워드를 입력하세요.');
      pwRef.current.focus();
      return false;
    }
    if (pwRef.current.value !== checkpwRef.current.value) {
      alert('비밀번호가 일치하지않습니다.');
      checkpwRef.current.focus();
      return false;
    }
    if (
      nicknameRef.current.value === '' ||
      nicknameRef.current.value === undefined
    ) {
      alert('닉네임을 입력하세요.');
      nicknameRef.current.focus();
      return false;
    } else {
      for (var i = 0; i < data.length; i++) {
        console.log(i);
        if (data[i].nickname == nicknameRef.current.value) {
          alert('중복된 닉네임입니다.');
          nicknameRef.current.focus();
          return false;
        }
      }
    }
    if (telRef.current.value === '' || telRef.current.value === undefined) {
      alert('전화번호를 입력하세요.');
      telRef.current.focus();
      return false;
    }
    if (addrRef.current.value === '' || addrRef.current.value === undefined) {
      alert('주소를 입력하세요.');
      addrRef.current.focus();
      return false;
    }
    if (birthRef.current.value === '' || birthRef.current.value === undefined) {
      alert('생년월일을 입력하세요.');
      birthRef.current.focus();
      return false;
    }

    var updateAddress = addrRef.current.value + ' ' + addr2Ref.current.value;
    axios
      .post('http://localhost:8008/member', {
        id: idRef.current.value,
        pw: pwRef.current.value,
        checkpw: checkpwRef.current.value,
        nickname: nicknameRef.current.value,
        tel: telRef.current.value,
        addr: updateAddress,
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
        <table border="1" width="400px" align="center">
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
              <input
                type="button"
                value="중복확인"
                width="20px"
                align="right"
                onClick={checkid}
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
            <td width="150px">비밀번호 확인</td>
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
              <input
                type="button"
                value="중복확인"
                width="20px"
                align="right"
                onClick={checknickname}
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
                placeholder="'-'를 빼고 입력하세요"
                required
              ></input>
            </td>
          </tr>
          <tr>
            <td width="100px">주소</td>
            <td>
              <div id="popupDom">
                {isPopupOpen && (
                  <PopupDom>
                    <PopupPostCode
                      onClose={closePostCode}
                      setAddress={setAddress}
                    />
                  </PopupDom>
                )}
              </div>
              <label for="addr">주소 : </label>
              <input ref={addrRef} type="text" name="addr" value={address} />
              <button type="button" onClick={openPostCode}>
                🔍
              </button>
              <div>
                <label for="addrDetail">상세주소 : </label>
                <input ref={addr2Ref} type="text" name="addrDetail" />
              </div>
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
