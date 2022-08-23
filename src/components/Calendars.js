import '../css/calendar.scss';
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from '../../node_modules/axios/index';
import { useNavigate } from 'react-router-dom';

const Calendars = () => {
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState();
  const [eventStartDate, setEventStartDate] = useState();
  const [eventEndDate, setEventEndDate] = useState();
  const [eventColor, setEventColor] = useState();
  const [display, setDisplay] = useState('');
  const [cList, setCList] = useState({ list: [] });
  const [calUpdate, setCalUpdate] = useState({
    cnum: '',
    ctitle: '',
    startdate: '',
    enddate: '',
    ccolor: '',
    userid: '',
  });
  const numRef = useRef();
  const titleRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const colorRef = useRef();

  const insertTitleRef = useRef();
  const insertStartDateRef = useRef();
  const insertEndDateRef = useRef();
  const insertColorRef = useRef();
  const navigate = useNavigate();

  var displayChange = {};

  // console.log(
  //   'Login:window.sessionStorage(login_id) =>',
  //   window.sessionStorage.getItem('id'),
  // );

  useEffect(() => {
    window.sessionStorage.getItem('id');
    if (window.sessionStorage.getItem('id') != null) {
      setVisible(true);
    } else {
      alert('로그인 후 이용하여 주세요');
      navigate('/');
    }
  }, []);

  // 전체일정 달력에 출력
  useEffect(() => {
    axios
      .post('http://localhost:8008/clist', {
        id: window.sessionStorage.getItem('id'),
      })
      .then((res) => {
        const { data } = res;
        setCList({
          list: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    setVisible(false);
  }, []);

  // 일정 등록
  const onSubmit = (e) => {
    console.log('확인');
    e.preventDefault();
    console.log(insertTitleRef.current.value);
    setEventTitle(insertTitleRef.current.value);
    setEventStartDate(insertStartDateRef.current.value);
    setEventEndDate(insertEndDateRef.current.value);
    setEventColor(insertColorRef.current.value);
    setVisible(false);
    axios
      .post('http://localhost:8008/cinsert', {
        ctitle: insertTitleRef.current.value,
        startdate: insertStartDateRef.current.value,
        enddate: insertEndDateRef.current.value,
        ccolor: insertColorRef.current.value,
        userid: window.sessionStorage.getItem('id'),
      })
      .then((res) => {
        console.log('확인');
      })
      .catch((e) => {
        console.error(e);
      });
    window.location.reload();
  };

  // 수정폼에 입력할 값설정
  const updateDetail = (update) => {
    setCalUpdate({
      cnum: update.event.id,
      ctitle: update.event.title,
      startdate: update.event.start,
      enddate: update.event.end,
      ccolor: update.event.backgroundColor,
    });
    setUpdateVisible(true);
  };
  useEffect(() => {
    console.log(calUpdate);
  }, [calUpdate]);

  //일정 수정
  const onUpdate = (e) => {
    e.preventDefault();
    setEventTitle(titleRef.current.value);
    setEventStartDate(startDateRef.current.value);
    setEventEndDate(endDateRef.current.value);
    setEventColor(colorRef.current.value);
    setUpdateVisible(false);
    if (window.confirm('수정 하시겠습니까?')) {
      axios
        .post('http://localhost:8008/cupdate', {
          cnum: numRef.current.value,
          ctitle: titleRef.current.value,
          startdate: startDateRef.current.value,
          enddate: endDateRef.current.value,
          ccolor: colorRef.current.value,
        })
        .then((res) => {
          console.log('확인');
          setEventTitle('');
          setEventStartDate('');
          setEventEndDate('');
          setEventColor('');
        })
        .catch((e) => {
          console.error(e);
        });
      alert('수정되었습니다');
    } else {
      alert('취소되었습니다');
    }

    window.location.reload();
  };

  const onDelete = (e) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      console.log(e.target.id);
      axios
        .post('http://localhost:8008/cdelete', {
          cnum: e.target.id,
        })
        .then((res) => {})
        .catch((err) => {
          console.error(err);
        });
      alert('삭제되었습니다');
    } else {
      alert('취소되었습니다');
    }
    window.location.reload();
  };

  const ChangeVisible = () => {
    setVisible(!visible);
    if (visible) {
      displayChange = { display: 'none' };
    } else {
      displayChange = { display: 'block' };
    }
  };
  return (
    <div className="calWrapper">
      <div className="visibleBtn">
        <button onClick={ChangeVisible}>
          {/* 일정입력칸 */}
          {visible ? '취소' : '일정입력하기'}
        </button>
      </div>
      <div className="hoverForm" style={{ displayChange }}>
        {visible && (
          <form onSubmit={onSubmit} className="inputForm">
            <tr>
              <label for="titleInput">제목 : </label>
              <input type="text" name="titleInput" ref={insertTitleRef} />
            </tr>
            <tr>
              <label for="colorInput">색상 : </label>
              <input type="color" name="colorInput" ref={insertColorRef} />
            </tr>
            <tr>
              <label for="startInput">시작날짜 : </label>
              <input type="date" name="startInput" ref={insertStartDateRef} />
            </tr>
            <tr>
              <label for="endInput">끝날짜 : </label>
              <input type="date" name="endInput" ref={insertEndDateRef} />
            </tr>
            <tr>
              <input className="submitBtn" type="submit" value="등록" />
            </tr>
          </form>
        )}
        {/* 수정 테이블 */}
        {updateVisible && (
          <form onSubmit={onUpdate} className="inputForm">
            <input type="hidden" defaultValue={calUpdate.cnum} ref={numRef} />
            <tr>
              <label for="titleInput">제목 : </label>
              <input
                type="text"
                name="titleInput"
                ref={titleRef}
                defaultValue={calUpdate.ctitle}
              />
            </tr>
            <tr>
              <label for="colorInput">색상 : </label>
              <input
                type="color"
                name="colorInput"
                ref={colorRef}
                defaultValue={calUpdate.ccolor}
              />
            </tr>
            <tr>
              <label for="dateInput">시작날짜 : </label>
              <input
                type="date"
                name="dateInput"
                ref={startDateRef}
                defaultValue={calUpdate.startdate}
              />
            </tr>
            <tr>
              <label for="dateInput">끝날짜 : </label>
              <input
                type="date"
                name="dateInput"
                ref={endDateRef}
                defaultValue={calUpdate.enddate}
              />
            </tr>
            <tr>
              <input type="submit" value="수정" />
              <input
                type="button"
                id={calUpdate.cnum}
                value="삭제"
                onClick={onDelete}
              ></input>
            </tr>
          </form>
        )}
      </div>
      <div className="calendar" style={{ margin: '25px 25px' }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          locale="ko"
          eventClick={function (arg) {
            updateDetail(arg);
            console.log(arg.event.id);
          }}
          events={cList.list.map((item) => {
            return {
              id: item.cnum,
              title: item.ctitle,
              start: item.startdate,
              end: item.enddate,
              backgroundColor: item.ccolor,
              borderColor: item.ccolor,
              editable: true,
            };
          })}
          // events={[
          //   {
          //     title: eventTitle,
          //     date: eventStartDate,
          //     end: eventEndDate,
          //     backgroundColor: eventColor,
          //     borderColor: eventColor,
          //     editable: true,
          //   },
          // ]}
        />
      </div>
    </div>
  );
};

export default Calendars;
