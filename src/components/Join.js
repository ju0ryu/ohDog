import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/join.scss';
import PopupPost from './PopupPost';
import PopupDom from './PopupDom';
import logoNew1 from '../icon/ohDogNew.jpg';

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
  const [checkId, setCheckId] = useState(true);
  const [checkNickname, setCheckNickname] = useState(true);

  const checkid = (e) => {
    setCheckId(false);
    axios
      .get('http://localhost:8008/memberlist', {})
      .then((res) => {
        console.log(res);
        const { data } = res;
        console.log(data);
        console.log('idref :', idRef.current.value);
        for (var i = 0; i < data.length; i++) {
          if (data[i].userid == idRef.current.value) {
            alert('중복된 아이디입니다.');
            idRef.current.focus();
            return false;
          } else {
            if (i == data.length - 1) {
              alert('사용가능한 아이디입니다.');
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checknickname = (e) => {
    console.log('checknickname :', nicknameRef.current.value);
    setCheckNickname(false);
    axios
      .get('http://localhost:8008/memberlist', {})
      .then((res) => {
        console.log(res);
        const { data } = res;
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          if (data[i].userid == idRef.current.value) {
            alert('중복된 닉네임입니다.');
            idRef.current.focus();
            return false;
          } else {
            if (i == data.length - 1) {
              alert('사용가능한 닉네임입니다.');
            }
          }
        }
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
      alert('아이디를 입력하세요.');
      idRef.current.focus();
      return false;
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
    if (checkId) {
      alert('아이디 중복확인 해주세요.');
      idRef.current.focus();
      return false;
    }

    if (checkNickname) {
      alert('닉네임 중복확인 해주세요.');
      nicknameRef.current.focus();
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
        navigate('/Login1');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <html>
      <head></head>
      <body>
        <div class="container2">
          <main class="loginMain">
            <section class="login">
              <article class="login__form__container">
                <div class="login__form">
                  <h1>
                    <a href="http://localhost:3000/join1">
                      <img src={logoNew1} alt="" />
                    </a>
                  </h1>
                  <div id="popupDom">
                    {isPopupOpen && (
                      <PopupDom>
                        <PopupPost
                          onClose={closePostCode}
                          setAddress={setAddress}
                        />
                      </PopupDom>
                    )}
                  </div>
                  <form class="login__input">
                    <input
                      type="text"
                      name="username"
                      placeholder="아이디를 입력하세요"
                      required="required"
                      maxlength="30"
                      maxLength={10}
                      ref={idRef}
                    />
                    <button
                      type="button"
                      class="jb"
                      value="중복확인"
                      onClick={checkid}
                    >
                      중복확인
                    </button>
                    <input
                      type="password"
                      name="password"
                      placeholder="비밀번호를 입력하세요"
                      required="required"
                      maxLength={20}
                      ref={pwRef}
                    />
                    <input
                      type="password"
                      name="checkpw"
                      placeholder="비밀번호를 확인해주세요"
                      required="required"
                      maxLength={20}
                      ref={checkpwRef}
                    />
                    <input
                      type="text"
                      name="Nickname"
                      placeholder="닉네임을 입력하세요"
                      required="required"
                      maxLength={10}
                      ref={nicknameRef}
                    />

                    <button
                      type="button"
                      value="중복확인"
                      class="jb"
                      onClick={checknickname}
                    >
                      중복확인
                    </button>
                    <input
                      type="number"
                      name="tel"
                      placeholder="전화번호를 입력하세요"
                      required="required"
                      maxLength={10}
                      ref={telRef}
                    />

                    <tr className="addr">
                      <td className="abcc">주소</td>
                      <div>
                        {/* <label for="addr">주소 : </label> */}
                        <input
                          ref={addrRef}
                          type="text"
                          name="addr"
                          value={address}
                        />
                      </div>
                      <button
                        className="joinSearch"
                        type="button"
                        onClick={openPostCode}
                      >
                        🔍
                      </button>
                      <td className="joinSearchTd"></td>
                    </tr>
                    <tr>
                      <td className="abc">상세주소</td>
                      <td className="def">
                        <div>
                          <input
                            ref={addr2Ref}
                            type="text"
                            name="addrDetail"
                            placeholder="상세주소를 입력해주세요"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="abc">생년월일</td>
                      <td className="def">
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
                    <div className="select">
                      <td className="abc">성별</td>
                      <td className="def">
                        <input
                          className="l"
                          id="male"
                          type="radio"
                          name="inputGender"
                          value="M"
                          onChange={onChange}
                        />
                        <label for="male">남성</label>
                      </td>
                      <td>
                        <input
                          className="l"
                          id="female"
                          type="radio"
                          name="inputGender"
                          value="F"
                          onChange={onChange}
                        />
                        <label for="female">여성</label>
                      </td>
                    </div>
                    <button onClick={handleMember}>가입</button>
                  </form>
                </div>
                <div class="login__register">
                  <span>계정이 있으신가요?</span>
                  <a href="/auth/signin">&nbsp;&nbsp;로그인</a>
                </div>
              </article>
            </section>
          </main>
        </div>
      </body>
    </html>
  );
};

export default Join;
