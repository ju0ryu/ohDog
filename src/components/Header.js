import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/header.scss';
import logo from '../icon/ohDog_title.svg';
import board from '../icon/boardBB.svg';
import boards from '../icon/boardG.svg';
import calendar from '../icon/calendarBB.svg';
import calendars from '../icon/calendarG.svg';
import edit from '../icon/editBB.svg';
import edits from '../icon/editG.svg';
import mainfeed from '../icon/mainfeedBB.svg';
import mainfeeds from '../icon/mainfeedG.svg';
import map from '../icon/mapBB.svg';
import maps from '../icon/mapG.svg';
import myfeed from '../icon/myfeedBB.svg';
import myfeeds from '../icon/myfeedG.svg';
import pet1 from '../icon/pet.svg';
import pet2 from '../icon/pet2.svg';
import pets from '../icon/petG.svg';
import logouts from '../icon/logoutBB.svg';
import logoutss from '../icon/logoutG.svg';
import logoNew from '../icon/ohDogNew.jpg';

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [ishovering1, setIshovering1] = useState(false);
  const [ishovering2, setIshovering2] = useState(false);
  const [ishovering3, setIshovering3] = useState(false);
  const [ishovering4, setIshovering4] = useState(false);
  const [ishovering5, setIshovering5] = useState(false);
  const [ishovering6, setIshovering6] = useState(false);
  const [ishovering7, setIshovering7] = useState(false);
  const [ishovering8, setIshovering8] = useState(false);
  const navigate = useNavigate();
  // console.log(
  //   'Login:window.sessionStorage(login_id) =>',
  //   window.sessionStorage.getItem('id'),
  // );

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
              <li
                title="내피드"
                className="nav"
                onMouseOver={() => setIshovering1(true)}
                onMouseOut={() => setIshovering1(false)}
              >
                {ishovering1 ? (
                  <img src={myfeed} alt="내피드" />
                ) : (
                  <img src={myfeeds} alt="내피드" />
                )}
              </li>
            </Link>
            <Link to="/mainFeed">
              <li
                title="전체피드"
                className="nav"
                onMouseOver={() => setIshovering2(true)}
                onMouseOut={() => setIshovering2(false)}
              >
                {ishovering2 ? (
                  <img src={mainfeed} alt="전체피드" />
                ) : (
                  <img src={mainfeeds} alt="전체피드" />
                )}
              </li>
            </Link>

            <Link to="/animal">
              <li
                title="나의펫"
                className="nav"
                onMouseOver={() => setIshovering3(true)}
                onMouseOut={() => setIshovering3(false)}
              >
                {ishovering3 ? (
                  <img src={pet1} alt="애완동물" />
                ) : (
                  <img src={pets} alt="애완동물" />
                )}
              </li>
            </Link>
            <Link to="/calendar">
              <li
                title="캘린더"
                className="nav"
                onMouseOver={() => setIshovering4(true)}
                onMouseOut={() => setIshovering4(false)}
              >
                {ishovering4 ? (
                  <img src={calendar} alt="캘린더" />
                ) : (
                  <img src={calendars} alt="캘린더" />
                )}
              </li>
            </Link>
          </ul>
        </nav>
        <div className="logo">
          <Link to="/mainFeed">
            <img
              src={logoNew}
              alt="로고"
              style={{ width: '100%', height: '100%' }}
            />
          </Link>
        </div>
        <nav className="navigation2">
          <ul className="nav-wrapper">
            <Link to="/board">
              <li
                title="게시판"
                className="nav"
                onMouseOver={() => setIshovering5(true)}
                onMouseOut={() => setIshovering5(false)}
              >
                {ishovering5 ? (
                  <img src={board} alt="게시판" />
                ) : (
                  <img src={boards} alt="게시판" />
                )}
              </li>
            </Link>
            <Link to="/map">
              <li
                title="지도"
                className="nav"
                onMouseOver={() => setIshovering6(true)}
                onMouseOut={() => setIshovering6(false)}
              >
                {ishovering6 ? (
                  <img src={map} alt="지도" />
                ) : (
                  <img src={maps} alt="지도" />
                )}
              </li>
            </Link>
            <Link to="/editMember">
              <li
                title="회원정보수정"
                className="nav"
                onMouseOver={() => setIshovering7(true)}
                onMouseOut={() => setIshovering7(false)}
              >
                {ishovering7 ? (
                  <img src={edit} alt="회원정보수정" />
                ) : (
                  <img src={edits} alt="회원정보수정" />
                )}
              </li>
            </Link>
            {visible && (
              <li
                title="로그아웃"
                onMouseOver={() => setIshovering8(true)}
                onMouseOut={() => setIshovering8(false)}
              >
                {ishovering8 ? (
                  <input
                    className="logout"
                    type="image"
                    src={logouts}
                    onClick={logout}
                    alt="로그아웃"
                  />
                ) : (
                  <input
                    className="logout"
                    type="image"
                    src={logoutss}
                    onClick={logout}
                    alt="로그아웃"
                  />
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
