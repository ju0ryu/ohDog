import React, { useEffect, useState } from 'react';
import '../css/myFeed.scss';
import axios from 'axios';

const MainFeed = () => {
  const [mainfeedlist, setMainfeedList] = useState({
    mainfeedList: [],
  });

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
          <table border="1" width="200px">
            <tr>
              <td>{mainlist.userid}</td>
            </tr>
            <tr>
              <td>{mainlist.fcomment}</td>
            </tr>
            <tr>
              <td>{mainlist.fdate}</td>
            </tr>
          </table>
        );
      })}
    </div>
  );
};

export default MainFeed;
