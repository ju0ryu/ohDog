import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from '../../node_modules/react-router-dom/index';
import '../css/login.scss';
import logoNew1 from '../icon/ohDogNew.jpg';
import facebook from '../icon/facebook.svg';

//로그인
const Login = () => {
  const idRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const handleLogin = () => {
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

    console.log(
      'Login:window.sessionStorage(login_id) =>',
      window.sessionStorage.getItem('id'),
    );

    axios
      .post('http://localhost:8008/login', {
        id: idRef.current.value,
        pw: pwRef.current.value,
      })
      .then((res) => {
        console.log('session :', idRef.current.value);
        // console.log('res.data :', res.data);
        if (idRef.current.value === 'admin' && res.data[0].cnt === 1) {
          window.sessionStorage.setItem('id', idRef.current.value);
          navigate('/member');
        } else if (res.data[0].cnt === 1) {
          window.sessionStorage.setItem('id', idRef.current.value);
          navigate('/mainfeed');
        } else {
          alert('등록되지않은 아이디입니다');
          navigate('/');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleMemberForm = () => {
    navigate('/join1');
  };

  return (
    <html>
      <head>
        <title></title>
      </head>
      <body>
        <div class="container1">
          <main class="loginMain">
            <section class="login">
              <article class="login__form__container">
                <div class="login__form">
                  <h1>
                    <a href="http://localhost:3000/">
                      <img src={logoNew1} alt="" />
                    </a>
                  </h1>
                  <div class="login__input">
                    <input
                      type="text"
                      name="username"
                      placeholder="아이디를 입력하세요"
                      required="required"
                      ref={idRef}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="비밀번호를 입력하세요"
                      required="required"
                      ref={pwRef}
                    />
                    <button onClick={handleLogin}>로그인</button>
                  </div>

                  <div class="login__horizon">
                    <div class="br"></div>
                    <div class="or">또는</div>
                    <div class="br"></div>
                  </div>
                  <div class="login__facebook">
                    <button onclick="javascript:location.href=''">
                      <i class="fab fa-facebook-square"></i>
                      <span>
                        <img src={facebook} width="14px" />
                        &nbsp; Facebook으로 로그인
                      </span>
                    </button>
                  </div>
                </div>

                <div class="login__register">
                  <span>계정이 없으신가요?</span>
                  <div class="signup1" onClick={handleMemberForm}>
                    가입하기
                  </div>
                </div>
              </article>
            </section>
          </main>
        </div>
      </body>
    </html>
  );
};

export default Login;
