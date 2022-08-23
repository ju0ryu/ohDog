import React, { useEffect, useState } from 'react';
import '../css/myFeed.scss';
import axios from 'axios';

const MainFeed = () => {
  const userid = window.sessionStorage.getItem('id');

  const [mainfeedlist, setMainfeedList] = useState({
    mainfeedList: [],
  });

  const onClick = () => {};

  useEffect(() => {
    console.log('mainfeedlist :', mainfeedlist.mainfeedList);
  }, [mainfeedlist]);

  useEffect(() => {
    axios
      .get('http://localhost:8008/mainfeed', {})
      .then((res) => {
        const { data } = res;
        console.log('data : ', data);
        setMainfeedList({
          mainfeedList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div>
      {mainfeedlist.mainfeedList.map((mainlist) => {
        return (
          <table border="1" hight="200px" width="400px">
            <tr>
              <td colSpan="2">{mainlist.userid}</td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                {mainlist.fcomment}
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="right">
                {mainlist.fdate}
              </td>
            </tr>

            <tr>
              <td colSpan="2" align="center">
                <input
                  id={mainlist.fnum}
                  type="button"
                  value="댓글보기"
                  onClick
                ></input>
              </td>
            </tr>
          </table>
        );
      })}
      ;
    </div>
  );
};

export default MainFeed;
