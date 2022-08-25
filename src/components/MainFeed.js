import React, { useEffect, useState, useRef } from 'react';
import '../css/mainFeed.scss';
import axios from 'axios';
import Fcommant from './Fcommant';
import msgbt from '../icon/msg.svg';

const MainFeed = () => {
  const userid = window.sessionStorage.getItem('id');

  const fccontentRef = useRef();

  const [mainfeedlist, setMainfeedList] = useState({
    mainfeedList: [],
  });

  const [fccontentlist, setFccontentList] = useState({
    fccontentList: [],
  });

  const [fnumstate, setFnumstate] = useState(-1);

  const onClick = (e) => {
    console.log('e.target.id =>', e.target.id);
    axios
      .post('http://localhost:8008/fccontentlist', { fnum: e.target.id })
      .then((res) => {
        const { data } = res;
        console.log('data(fccontentlist) : ', data);
        setFnumstate(e.target.id);
        setFccontentList({
          fccontentList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const fcInsert = (e) => {
    e.preventDefault();
    console.log('확인', fccontentRef.current.value);
    console.log(e.target.id);
    axios
      .post('http://localhost:8008/fccontentinsert', {
        fnum: e.target.id,
        userid,
        fccontent: fccontentRef.current.value,
      })
      .then((res) => {
        console.log('fcInser=>', res);
        fccontentRef.current.value = '';
        onClick(e);
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
  console.log('fccontentlist.fccontentList =>', fccontentlist.fccontentList);

  return (
    <div className="mainTitle">
      <p>전체피드</p>
      <div className="imagebox">imagebox</div>
      <div className="imagebox">imagebox</div>
      <div className="imagebox">imagebox</div>

      <div className="mainbox">
        {mainfeedlist.mainfeedList.map((mainlist) => {
          console.log(
            'mainlist.fnum=',
            mainlist.fnum,
            ',  fnumstate=',
            fnumstate,
          );
          if (mainlist.fnum == fnumstate) {
            return (
              <div className="mainfeedbox" height="350px">
                <table className="mainlistbox" width="700px">
                  <tr>
                    <td width="10px"></td>
                    <td className="mainuserid" width="100%" align="center">
                      {mainlist.userid}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="mainfcbox" colSpan="3" align="center">
                      {mainlist.fcomment}
                    </td>
                  </tr>
                  <tr>
                    <td className="mainfdate" colSpan="3" align="right">
                      {mainlist.fdate}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" align="center">
                      <input
                        className="msgbt"
                        type="image"
                        src={msgbt}
                        alt="댓글보기"
                        id={mainlist.fnum}
                        onClick={onClick}
                        height="25px"
                      ></input>
                    </td>
                  </tr>
                </table>
                <form onSubmit={fcInsert} id={mainlist.fnum}>
                  <table className="fccommant" align="center">
                    <tr>
                      <td align="center" colSpan="2">
                        <input
                          className="fcinput"
                          type="text"
                          name="comment"
                          ref={fccontentRef}
                          size="40"
                          defaultValue=""
                          placeholder="댓글달기"
                          // onChange={onChange}
                        />
                      </td>
                      <td>
                        <input type="submit" value="작성"></input>
                      </td>
                    </tr>
                  </table>
                </form>
                <div className="fclist">
                  {fccontentlist.fccontentList.map((article) => {
                    return <Fcommant article={article} />;
                  })}
                </div>
              </div>
            );
          } else {
            return (
              <div className="mainfeedbox" height="350px">
                <table className="mainlistbox" width="700px">
                  <tr>
                    <td width="10px"></td>
                    <td className="mainuserid" width="100%" align="center">
                      {mainlist.userid}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="mainfcbox" colSpan="3" align="center">
                      {mainlist.fcomment}
                    </td>
                  </tr>
                  <tr>
                    <td className="mainfdate" colSpan="3" align="right">
                      {mainlist.fdate}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" align="center">
                      <input
                        className="msgbt"
                        type="image"
                        src={msgbt}
                        alt="댓글보기"
                        id={mainlist.fnum}
                        onClick={onClick}
                        height="25px"
                      ></input>
                    </td>
                  </tr>
                </table>

                {/* <div>
                 {fccontentlist.fccontentList.map((article) => {
                   return <Fcommant article={article} />;
                 })}
               </div> */}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default MainFeed;
