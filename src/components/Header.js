import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="wrapper">
        <nav className="navigation">
          <ul className="nav-wrapper">
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
            <Link to="/calendar">
              <li className="nav">
                <img src="#" alt="캘린더" />
              </li>
            </Link>
          </ul>
        </nav>
        <div className="logo">
          <img src="/ohDog_title.svg" alt="로고" />
        </div>
        <nav className="navigation">
          <ul className="nav-wrapper">
            <Link to="/mainFeed">
              <li className="nav">
                <img src="#" alt="전체피드" />
              </li>
            </Link>
            <Link to="/board">
              <li className="nav">
                <img src="#" alt="게시판" />
              </li>
            </Link>
            <Link to="/map">
              <li className="nav">
                <img src="#" alt="지도" />
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
