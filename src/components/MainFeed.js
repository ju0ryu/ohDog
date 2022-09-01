import React, { useEffect, useState, useRef } from 'react';
import '../css/mainFeed.scss';
import axios from 'axios';
import Fcommant from './Fcommant';
import msgbt from '../icon/msg.svg';
import Photos from './Photo';
import inputbt from '../icon/write.svg';
import msgbtn from '../icon/message.svg';

// 스와이프 넘기기
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../css/swiper-styles.css';
import MainFeedArticle from './MainFeedArticle';

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

  const [visible, setVisible] = useState(false);

  // =============================이미지===================================
  const [imagelist, setImagelist] = useState({
    imageList: [],
  });
  // =============================이미지===================================
  const [feedLike, setFeedLike] = useState(false);
  const likeChange = () => {
    setFeedLike(!feedLike);
  };
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
        // console.log('data(fccontentlist) : ', data);
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
    // console.log(e);
    // console.log('확인', fccontentRef.current.value);
    // console.log(e.target.id);
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
  // console.log('fccontentlist.fccontentList =>', fccontentlist.fccontentList);

  // ========================이미지==============================
  useEffect(() => {
    axios
      .post('http://localhost:8008/main_ilist', { userid })
      .then((res) => {
        // console.log('res ==>', res);
        const { data } = res;
        // console.log('main_data ==>', data);
        setImagelist({
          imageList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  // ========================이미지==============================

  return (
    <div className="mainTitle">
      <p>전체피드</p>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* // ========================이미지============================== */}

        <div className="container">
          {imagelist.imageList.map((article) => {
            return (
              <SwiperSlide>
                <Photos
                  userid={article.userid}
                  imgurl={'http://localhost:8008/uploads/' + article.imgurl}
                  imgnum={article.imgnum}
                  secret={article.secret}
                />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
      {/* // ========================이미지============================== */}
      <div className="mainbox">
        {mainfeedlist.mainfeedList.map((mainlist) => {
          return <MainFeedArticle mainlist={mainlist} />;

          // if (mainlist.fnum == fnumstate) {
          //   return (
          //     <div>
          //       <div className="mainfeedbox" height="700px">
          //         <table className="mainlistbox" width="700px">
          //           <tr>
          //             <td className="mainuserid">{mainlist.userid}</td>
          //             <td className="mainfcbox" colSpan="4" align="center">
          //               {mainlist.fcomment}
          //             </td>
          //           </tr>
          //           <tr>
          //             <td className="msgbtTd">
          //               <input
          //                 className="msgbt"
          //                 type="image"
          //                 src={msgbtn}
          //                 alt="댓글보기"
          //                 id={mainlist.fnum}
          //                 onClick={commentVisible}
          //                 height="25px"
          //               ></input>
          //               <p className="mainLike" onClick={likeChange}>
          //                 {feedLike ? '♥' : '♡'}
          //               </p>
          //             </td>
          //             {/* <td></td> */}
          //             <td className="mainfdate">
          //               {makeFeedTime(mainlist.fdate)}
          //             </td>
          //           </tr>
          //         </table>
          //         <form onSubmit={fcInsert} id={mainlist.fnum}>
          //           <table className="fccommant" align="center" width="700px">
          //             <tr>
          //               <td className="insertfcomment">
          //                 <input
          //                   className="fcinput"
          //                   type="text"
          //                   name="comment"
          //                   ref={fccontentRef}
          //                   size="60"
          //                   defaultValue=""
          //                   placeholder="댓글달기"
          //                   // onChange={onChange}
          //                 />
          //                 <div>
          //                   <input
          //                     className="inputbt"
          //                     type="image"
          //                     src={inputbt}
          //                     alt="댓글달기"
          //                   ></input>
          //                 </div>
          //               </td>
          //             </tr>
          //           </table>
          //         </form>

          //         {visible && (
          //           <div className="fclist">
          //             {fccontentlist.fccontentList.length == 0 ? (
          //               <p style={{ fontSize: '25px' }}>댓글이 없습니다.</p>
          //             ) : (
          //               fccontentlist.fccontentList.map((article) => {
          //                 return <Fcommant article={article} />;
          //               })
          //             )}
          //           </div>
          //         )}
          //       </div>
          //     </div>
          //   );
          // } else {
          //   return (
          //     <div>
          //       <div className="mainfeedbox" height="700px">
          //         <table className="mainlistbox" width="700px">
          //           <tr>
          //             <td className="mainuserid">{mainlist.userid}</td>

          //             <td className="mainfcbox" colSpan="4" align="center">
          //               {mainlist.fcomment}
          //             </td>
          //           </tr>
          //           <tr>
          //             <td className="msgbtTd">
          //               <input
          //                 className="msgbt"
          //                 type="image"
          //                 src={msgbtn}
          //                 alt="댓글보기"
          //                 id={mainlist.fnum}
          //                 onClick={commentVisible}
          //                 height="25px"
          //               ></input>
          //               <p
          //                 align="left"
          //                 className="mainLike"
          //                 onClick={likeChange}
          //               >
          //                 {feedLike ? '♥' : '♡'}
          //               </p>
          //             </td>
          //             {/* <td></td> */}
          //             <td className="mainfdate">
          //               {makeFeedTime(mainlist.fdate)}
          //             </td>
          //           </tr>
          //         </table>
          //         {/* <form onSubmit={fcInsert} id={mainlist.fnum}>
          //           <table className="fccommant" align="center" width="700px">
          //             <tr>
          //               <td align="center">
          //                 <input
          //                   className="fcinput"
          //                   type="text"
          //                   name="comment"
          //                   ref={fccontentRef}
          //                   size="60"
          //                   defaultValue=""
          //                   placeholder="댓글달기"
          //                 // onChange={onChange}
          //                 />
          //                 <input
          //                   className="inputbt"
          //                   type="image"
          //                   src={inputbt}
          //                   alt="댓글달기"
          //                 ></input>
          //               </td>
          //             </tr>
          //           </table>
          //         </form> */}
          //       </div>
          //     </div>
          //   );
          // }
        })}
      </div>
    </div>
  );
};

export default MainFeed;
