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

  // const fccontent = ({ fccontentlist }) => {
  //   const userid = 'userid 01';

  //   axios
  //     .post('http://localhost:8008/fccontentinsert', {
  //       userid,
  //       fccontent: fccontentRef.current.value,
  //     })
  //     .then((res) => {
  //       fccontentlist();
  //       userid = 'userid 01';
  //       fccontentRef.current.value = '';
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // };

  return (
    <div>
      {mainfeedlist.mainfeedList.map((mainlist) => {
        return (
          <div className="mainlist">
            <table border="1" hight="200px" width="200px">
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
              <br />
              <tr>
                <td align="right">
                  <input
                    type="text"
                    name="comment"
                    size="80"
                    placeholder="댓글달기"
                  ></input>
                </td>
                <td>
                  <input type="button" value="작성" onClick></input>
                </td>
              </tr>
            </table>
          </div>
        );
      })}
      <div>
        <label>photo</label>
      </div>
    </div>
  );
};

export default MainFeed;
