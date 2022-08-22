import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/header.scss';

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
        <nav className="navigation">
          <ul className="nav-wrapper">
            <Link to="/mainFeed">
              <li className="nav">
                <img src="#" alt="전체피드" />
              </li>
            </Link>
            <Link to="/myFeed">
              <li className="nav">
                <img src="#" alt="내피드" />
              </li>
            </Link>
            <Link to="/animal">
              <li className="nav">
                <img src="#" alt="동물" />
              </li>
            </Link>
          </ul>
        </nav>
        <div className="logo">
          <img
            src="./ohDog_title.svg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <nav className="navigation">
          <ul className="nav-wrapper">
            <Link to="/board">
              <li className="nav">
                <img src="#" alt="게시판" />
              </li>
            </Link>
            <Link to="/calendar">
              <li className="nav">
                <img src="#" alt="캘린더" />
              </li>
            </Link>
            <Link to="/map">
              <li className="nav">
                <img src="#" alt="지도" />
              </li>
            </Link>
            {visible && (
              <li>
                <input type="button" value="로그아웃" onClick={logout} />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
