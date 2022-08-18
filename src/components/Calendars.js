import '../css/calendar.scss';
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from '../../node_modules/axios/index';

const Calendars = () => {
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState();
  const [eventStartDate, setEventStartDate] = useState();
  const [eventEndDate, setEventEndDate] = useState();
  const [eventColor, setEventColor] = useState();
  const [cList, setCList] = useState({ list: [] });

  const titleRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const colorRef = useRef();
  const calendarRef = useRef();

  useEffect(() => {
    axios
      .get('http://localhost:8008/clist', {})
      .then((res) => {
        console.log(res);
        const { data } = res;
        setCList({
          list: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onSubmit = (e) => {
    setEventTitle(titleRef.current.value);
    setEventStartDate(startDateRef.current.value);
    setEventEndDate(endDateRef.current.value);
    setEventColor(colorRef.current.value);
    setVisible(false);
    axios
      .post('http://localhost:8008/cinsert', {
        ctitle: titleRef.current.value,
        startdate: startDateRef.current.value,
        enddate: endDateRef.current.value,
        ccolor: colorRef.current.value,
        userid: 'userid 01',
      })
      .then((res) => {
        console.log('확인');
      })
      .catch((e) => {
        console.error(e);
      });
    window.location.reload();
  };

  const onUpdate = (e) => {
    e.preventDefault();
    setEventTitle(titleRef.current.value);
    setEventStartDate(startDateRef.current.value);
    setEventEndDate(endDateRef.current.value);
    setEventColor(colorRef.current.value);
    setUpdateVisible(false);

    axios
      .post('http://localhost:8008/cupdate', {
        ctitle: titleRef.current.value,
        startdate: startDateRef.current.value,
        enddate: endDateRef.current.value,
        ccolor: colorRef.current.value,
        userid: 'userid 01',
      })
      .then((res) => {
        console.log('확인');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onDelete = () => {
    const title = titleRef.current.value;
    alert(title);
  };
  return (
    <div>
      <div>
        <button
          className="visibleBtn"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {/* 일정입력칸 */}
          {visible ? '취소' : '일정입력하기'}
        </button>
        {visible && (
          <form onSubmit={onSubmit} className="inputForm">
            <tr>
              <label for="titleInput">제목 : </label>
              <input type="text" name="titleInput" ref={titleRef} />
            </tr>
            <tr>
              <label for="colorInput">색상 : </label>
              <input type="color" name="colorInput" ref={colorRef} />
            </tr>
            <tr>
              <label for="startInput">시작날짜 : </label>
              <input type="date" name="startInput" ref={startDateRef} />
            </tr>
            <tr>
              <label for="endInput">끝날짜 : </label>
              <input type="date" name="endInput" ref={endDateRef} />
            </tr>
            <tr>
              <input type="submit" value="등록" />
            </tr>
          </form>
        )}
        {/* 수정 테이블 */}
        {updateVisible && (
          <form onSubmit={onUpdate} className="inputForm">
            <tr>
              <label for="titleInput">제목 : </label>
              <input
                type="text"
                name="titleInput"
                ref={titleRef}
                defaultValue={eventTitle}
              />
            </tr>
            <tr>
              <label for="colorInput">색상 : </label>
              <input
                type="color"
                name="colorInput"
                ref={colorRef}
                defaultValue={eventColor}
              />
            </tr>
            <tr>
              <label for="dateInput">시작날짜 : </label>
              <input
                type="date"
                name="dateInput"
                ref={startDateRef}
                defaultValue={eventStartDate}
              />
            </tr>
            <tr>
              <label for="dateInput">시작날짜 : </label>
              <input
                type="date"
                name="dateInput"
                ref={endDateRef}
                defaultValue={eventEndDate}
              />
            </tr>
            <tr>
              <input type="submit" value="수정" />
              <input type="button" value="삭제" onClick={onDelete}></input>
            </tr>
          </form>
        )}
      </div>
      <div style={{ margin: '25px 25px' }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          locale="ko"
          eventClick={function (arg) {
            setUpdateVisible(true);
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
