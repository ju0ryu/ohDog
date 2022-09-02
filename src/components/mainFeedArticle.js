import React, { useRef, useState } from 'react';
import msgbt from '../icon/msg.svg';
import axios from 'axios';
import inputbt from '../icon/write.svg';
import msgbtn from '../icon/message.svg';
import Fcommant from './Fcommant';
const oneDay = 1000 * 60 * 60 * 24;

function makeTwoDigits(time) {
  return time.toString().length !== 2 ? `0${time}` : time;
}

function makeFeedTime(timestamp) {
  // console.log('timestamp:', timestamp);
  const feedDate = new Date(timestamp);
  const nowDate = Date.now(); // 현재시간
  const milTime = feedDate.getTime();
  const timeGap = nowDate - milTime;
  // console.log('timeGap', timeGap);
  const date = parseInt(timeGap / oneDay);
  //nowDate - timestamp > 24 어제
  const hour = feedDate.getHours();
  const minutes = feedDate.getMinutes();

  return `${hour > 12 ? '오후' : '오전'} 
    ${hour > 12 ? makeTwoDigits(hour - 12) : makeTwoDigits(hour)}:
    ${makeTwoDigits(minutes)},
    ${date === 0 ? '오늘' : date === 1 ? '어제' : `${date}일전`}`;
}

const MainFeedArticle = ({ mainlist }) => {
  const userid = window.sessionStorage.getItem('id');

  const fccontentRef = useRef();
  const [fccontentlist, setFccontentList] = useState({
    fccontentList: [],
  });

  const [fnumstate, setFnumstate] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [feedLike, setFeedLike] = useState(mainlist.flikeck);

  const commentVisible = (e) => {
    setVisible(!visible);
    onClick(e);
    console.log('visible :', visible);
  };
  const onClick = (e) => {
    // console.log('visible =>', visible);
    axios
      .post('http://localhost:8008/fccontentlist', { fnum: e.target.id })
      .then((res) => {
        const { data } = res;
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
    axios
      .post('http://localhost:8008/fccontentinsert', {
        fnum: e.target.id,
        userid,
        fccontent: fccontentRef.current.value,
      })
      .then((res) => {
        // console.log('fcInser=>', res);
        fccontentRef.current.value = '';
        onClick(e);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const likeChange = (e) => {
    // console.log('좋아요 체크 : ', e.target.value);
    setFeedLike(!feedLike);
    console.log('boardLike 확인 : ', feedLike);
    axios
      .post('http://localhost:8008/flikelist', {
        userid,
        flnum: e.target.id,
      })
      .then((res) => {
        // console.log('좋아요 리스트 :', res);
        const { data } = res;
        // console.log('data.length :', data[0]);
        if (data.length == 0) {
          // console.log('if enter');
          axios
            .post('http://localhost:8008/flikeinsert', {
              userid,
              flnum: e.target.id,
              flikeck: true,
            })
            .then((res) => {
              // console.log('좋아요 등록 :', res);
            });
        } else {
          console.log('boardlike check :', data[0].flikeck);
          axios
            .post('http://localhost:8008/flikeupdate', {
              userid,
              flnum: e.target.id,
              flikeck: data[0].flikeck == null ? 1 : null,
            })
            .then((res) => {
              const { data } = res;
              // console.log('좋아요 수정 :', data);
            });
        }
      });
  };

  return (
    <div className="mainbox">
      <div>
        <div>
          <div className="mainfeedbox" height="700px">
            <table className="mainlistbox" width="700px">
              <tr>
                <td className="mainuserid">{mainlist.userid}</td>
                <td className="mainfcbox" colSpan="4" align="center">
                  {mainlist.fcomment}
                </td>
              </tr>
              <tr>
                <td className="msgbtTd">
                  <input
                    className="msgbt"
                    type="image"
                    src={msgbtn}
                    alt="댓글보기"
                    id={mainlist.fnum}
                    onClick={commentVisible}
                    height="25px"
                  ></input>
                  {/* <p className="mainLike" onClick={likeChange}>
                    {feedLike ? '♥' : '♡'}
                  </p> */}
                  <input
                    className="flikeBtn"
                    onClick={likeChange}
                    id={mainlist.fnum}
                    type="button"
                    // value={article.likeck == 1 ? '♥' : '♡'}
                    value={
                      mainlist.fluserid == userid && feedLike == 1 ? '♥' : '♡'
                    }
                  />
                </td>
                {/* <td></td> */}
                <td className="mainfdate">{makeFeedTime(mainlist.fdate)}</td>
              </tr>
            </table>
            <form onSubmit={fcInsert} id={mainlist.fnum}>
              <table className="fccommant" align="center" width="700px">
                <tr>
                  <td className="insertfcomment">
                    <input
                      className="fcinput"
                      type="text"
                      name="comment"
                      ref={fccontentRef}
                      size="60"
                      defaultValue=""
                      placeholder="댓글달기"
                      // onChange={onChange}
                    />
                    <div>
                      <input
                        className="inputbt"
                        type="image"
                        src={inputbt}
                        alt="댓글달기"
                      ></input>
                    </div>
                  </td>
                </tr>
              </table>
            </form>

            {visible && (
              <div className="fclist">
                {fccontentlist.fccontentList.length == 0 ? (
                  <p style={{ fontSize: '25px' }}>댓글이 없습니다.</p>
                ) : (
                  fccontentlist.fccontentList.map((article) => {
                    return <Fcommant article={article} />;
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFeedArticle;
