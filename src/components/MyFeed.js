import React from 'react';
import MyFeedWrite from './MyFeedWrite';
import MyFeedList from './MyFeedList';
import '../css/myFeed.scss';
import { Link } from 'react-router-dom';
const MyFeed = () => {
  return (
    <div>
      <nav id="menu">
        <h1>
          <ul>
            <Link to="/myFeed">
              <li>
                <a href="#">MYFEED</a>
              </li>
            </Link>
            <Link to="/image">
              <li>
                <a href="#">MYPHTO</a>
              </li>
            </Link>
          </ul>
        </h1>
      </nav>

      <MyFeedWrite />
      <br />
      <br />
      <MyFeedList />
      <br />
      <br />
    </div>
  );
};

export default MyFeed;
