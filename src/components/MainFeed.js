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

  const [mainfeedlist, setMainfeedList] = useState({
    mainfeedList: [],
  });
  const [imagelist, setImagelist] = useState({
    imageList: [],
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

  // ========================이미지==============================
  useEffect(() => {
    axios
      .post('http://localhost:8008/main_ilist', { userid })
      .then((res) => {
        const { data } = res;
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
        })}
      </div>
    </div>
  );
};

export default MainFeed;
