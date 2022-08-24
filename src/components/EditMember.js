import '../css/editMember.scss';
import React, { useEffect, useRef, useState } from 'react';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import axios from 'axios';
import { useNavigate } from 'react-router';
import logo from '../icon/ohDog_logo.svg';

const EditMember = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState();
  const userid = window.sessionStorage.getItem('id');
  const [article, setArticle] = useState({
    userid: '',
    userpw: '',
    checkpw: '',
    nickname: '',
    tel: '',
    addr: '',
    birth: '',
    gender: '',
  });

  const pwRef = useRef();
  const pwcRef = useRef();
  const nickRef = useRef();
  const telRef = useRef();
  const addr1Ref = useRef();
  const addr2Ref = useRef();
  const birthRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post('http://localhost:8008/elist', { userid })
      .then((res) => {
        const { data } = res;
        setArticle({
          userid: data[0].userid,
          userpw: data[0].userpw,
          checkpw: data[0].checkpw,
          nickname: data[0].nickname,
          tel: data[0].tel,
          addr: data[0].addr,
          birth: data[0].birth,
          gender: data[0].gender,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const updateForm = (e) => {
    e.preventDefault();
    var updateAddress = addr1Ref.current.value + ' ' + addr2Ref.current.value;
    if (window.confirm('수정하시겠습니까?')) {
      axios
        .post('http://localhost:8008/eupdate', {
          userid,
          userpw: pwRef.current.value,
          checkpw: pwcRef.current.value,
          nickname: nickRef.current.value,
          tel: telRef.current.value,
          addr: updateAddress,
          birth: birthRef.current.value,
        })
        .then((res) => {
          alert('수정이 완료되었습니다.');
          navigate('/mainFeed');
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert('취소되었습니다.');
    }
  };

  return (
    <div>
      <div className="editWrapper">
        <div className="eTitle">
          <p>회원정보수정</p>
        </div>
        <div className="editForm">
          <form onSubmit={updateForm}>
            <div className="popup">
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
            </div>
            <table>
              <tr>
                <td colSpan="2">
                  <img src={logo} alt="로고" />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="id">아이디 : </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="id"
                    defaultValue={article.userid}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="pw">비밀번호 : </label>
                </td>
                <td>
                  <input
                    type="password"
                    name="pw"
                    defaultValue={article.userpw}
                    ref={pwRef}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="pwCheck">비밀번호확인 : </label>
                </td>
                <td>
                  <input
                    ref={pwcRef}
                    type="password"
                    name="pwCheck"
                    defaultValue={article.checkpw}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="nick">닉네임 : </label>
                </td>
                <td>
                  <input
                    ref={nickRef}
                    type="text"
                    name="nick"
                    defaultValue={article.nickname}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="tel">전화번호</label>
                </td>
                <td>
                  <input
                    ref={telRef}
                    type="tel"
                    name="tel"
                    defaultValue={article.tel}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="addr">주소 : </label>
                </td>
                <td>
                  <input
                    ref={addr1Ref}
                    type="text"
                    name="addr"
                    defaultValue={address == null ? article.addr : address}
                  />
                </td>
                <td>
                  <button type="button" onClick={openPostCode}>
                    🔍
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="addrDetail">상세주소 : </label>
                </td>
                <td>
                  <input ref={addr2Ref} type="text" name="addrDetail" />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="birth">생년월일 : </label>
                </td>
                <td>
                  <input
                    ref={birthRef}
                    type="date"
                    name="birth"
                    defaultValue={article.birth}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="gender">성별 : </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="gender"
                    defaultValue={article.gender}
                    readOnly
                  />
                </td>
              </tr>
            </table>
            <input className="eSubmit" type="submit" value="수정" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMember;
