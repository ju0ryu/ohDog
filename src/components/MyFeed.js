import React, { useState } from 'react';
import MyFeedWrite from './MyFeedWrite';
import MyFeedList from './MyFeedList';
import '../css/myFeed.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyFeed = () => {
  const [myfeedlist, setMyfeedList] = useState({
    myfeedList: [],
  });

  const userid = window.sessionStorage.getItem('id');
  // useEffect(() => {
  //   console.log('세션확인 : ', userid);
  // }, []);

  const getList = () => {
    axios
      .post('http://localhost:8008/flist', { userid })
      .then((res) => {
        const { data } = res;
        console.log('data : ', data);
        setMyfeedList({
          myfeedList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <div>
      <nav id="menu">
        <h1>
          <ul>
            <Link to="/myFeed">
              <li>
                <a className="myfeedlink" href="#">
                  MYFEED
                </a>
              </li>
            </Link>
            <Link to="/image">
              <li>
                <a className="myphotolink" href="#">
                  MYPHOTO
                </a>
              </li>
            </Link>
          </ul>
        </h1>
      </nav>

      <MyFeedWrite handlelist={getList}></MyFeedWrite>
      <br />
      <MyFeedList myfeedlist={myfeedlist} handlelist={getList}></MyFeedList>
      <br />
      <br />
    </div>
  );
};

export default MyFeed;
