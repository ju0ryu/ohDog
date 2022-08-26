import React, { useEffect, useState, useRef } from 'react';
import '../css/mainFeed.scss';
import axios from 'axios';
import Fcommant from './Fcommant';
import msgbt from '../icon/msg.svg';
import Photos from './photo';
import inputbt from '../icon/write.svg';

// 스와이프 넘기기
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../css/swiper-styles.css';

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

  // =============================이미지===================================
  const [imagelist, setImagelist] = useState({
    imageList: [],
  });
  // =============================이미지===================================

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

  // ========================이미지==============================
  useEffect(() => {
    axios
      .post('http://localhost:8008/main_ilist', { userid })
      .then((res) => {
        console.log('res ==>', res);
        const { data } = res;
        console.log('main_data ==>', data);
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
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
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

        {/* <SwiperSlide>1</SwiperSlide>
        <SwiperSlide>2</SwiperSlide>
        <SwiperSlide>3</SwiperSlide>
        <SwiperSlide>4</SwiperSlide>
        <SwiperSlide>5</SwiperSlide>
        <SwiperSlide>6</SwiperSlide> */}
      </Swiper>
      {/* // ========================이미지============================== */}
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
                    <td width="10px"></td>
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
                  <table className="fccommant" align="center" width="705px">
                    <tr>
                      <td align="center">
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
                        <input
                          className="inputbt"
                          type="image"
                          src={inputbt}
                          alt="댓글달기"
                        ></input>
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
                    <td height="10px"></td>
                  </tr>
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
                    <td width="10px"></td>
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
