import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/header.scss';
import logo from '../icon/ohDog_title.svg';
import board from '../icon/boardB.svg';
import boards from '../icon/boardG.svg';
import calendar from '../icon/calendarB.svg';
import calendars from '../icon/calendarG.svg';
import edit from '../icon/editB.svg';
import edits from '../icon/editG.svg';
import mainfeed from '../icon/mainfeedB.svg';
import mainfeeds from '../icon/mainfeedG.svg';
import map from '../icon/mapB.svg';
import maps from '../icon/mapG.svg';
import myfeed from '../icon/myfeedB.svg';
import myfeeds from '../icon/myfeedG.svg';
import pet1 from '../icon/pet1.svg';
import pet2 from '../icon/pet2.svg';
import pets from '../icon/petG.svg';
import logouts from '../icon/logoutB.svg';
import logoutss from '../icon/logoutG.svg';
import logoNew from '../icon/ohDogNew.jpg';

const Header = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  console.log(
    'Login:window.sessionStorage(login_id) =>',
    window.sessionStorage.getItem('id'),
  );

  useEffect(() => {
    if (window.sessionStorage.getItem('id') != null) {
      setVisible(true);
    } else {
      // alert('로그인 후 이용하여 주세요');
      navigate('/');
    }
  }, []);
  const logout = () => {
    window.sessionStorage.clear();
    alert('로그아웃 되었습니다.');
    setVisible(false);
    navigate('/');
  };

  return (
    <div className="header">
      <div className="wrapper">
        <nav className="navigation1">
          <ul className="nav-wrapper">
            <Link to="/myFeed">
              <li title="내피드" className="nav">
                <img src={myfeeds} alt="내피드" />
              </li>
            </Link>
            <Link to="/mainFeed">
              <li
                title="전체피드"
                className="nav"
                onMouseOver={() => <img src={mainfeed} alt="전체피드" />}
              >
                <img src={mainfeeds} alt="전체피드" />
              </li>
            </Link>

            <Link to="/animal">
              <li title="나의펫" className="nav">
                <img src={pets} alt="동물" />
              </li>
            </Link>
            <Link to="/calendar">
              <li title="캘린더" className="nav">
                <img src={calendars} alt="캘린더" />
              </li>
            </Link>
          </ul>
        </nav>
        <div className="logo">
          <img
            src={logoNew}
            alt="로고"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <nav className="navigation2">
          <ul className="nav-wrapper">
            <Link to="/board">
              <li title="게시판" className="nav">
                <img src={boards} alt="게시판" />
              </li>
            </Link>
            <Link to="/map">
              <li title="지도" className="nav">
                <img src={maps} alt="지도" />
              </li>
            </Link>
            <Link to="/editMember">
              <li title="회원정보수정" className="nav">
                <img src={edits} alt="회원정보수정" />
              </li>
            </Link>
            {visible && (
              <li title="로그아웃">
                <input
                  className="logout"
                  type="image"
                  src={logoutss}
                  onClick={logout}
                />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
