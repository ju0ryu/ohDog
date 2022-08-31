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
    setVisible(true);
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
  };
  return (
    <>
      <div className="visibleBtn">
        <p>일정등록</p>
        <button onClick={ChangeVisible}>
          {/* 일정입력칸 */}
          {visible ? '취소' : '일정입력하기'}
        </button>
      </div>
      <div>
        {visible && (
          <form
            className={visible ? 'hoverForm' : 'hidden'}
            onSubmit={onSubmit}
          >
            <table>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td className="nameLabel">
                  <label for="titleInput">제목 : </label>
                </td>
                <td>
                  <input type="text" name="titleInput" ref={insertTitleRef} />
                </td>
              </tr>
              <tr>
                <td className="nameLabel">
                  <label for="colorInput">색상 : </label>
                </td>
                <td>
                  <input
                    className="colorInput"
                    type="color"
                    name="colorInput"
                    ref={insertColorRef}
                  />
                </td>
              </tr>
              <tr>
                <td className="nameLabel">
                  <label for="startInput">시작날짜 : </label>
                </td>
                <td>
                  <input
                    type="date"
                    name="startInput"
                    ref={insertStartDateRef}
                  />
                </td>
              </tr>
              <tr>
                <td className="nameLabel">
                  <label for="endInput">끝날짜 : </label>
                </td>
                <td>
                  <input type="date" name="endInput" ref={insertEndDateRef} />
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <input className="submitBtn" type="submit" value="등록" />
                </td>
              </tr>
            </table>
          </form>
        )}
        {/* 수정 테이블 */}
        {updateVisible && (
          <form
            onSubmit={onUpdate}
            className={updateVisible ? 'hoverForm' : 'hidden'}
          >
            <table>
              <input type="hidden" defaultValue={calUpdate.cnum} ref={numRef} />
              <tr>
                <td className="nameLabel">
                  <label for="titleInput">제목 : </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="titleInput"
                    ref={titleRef}
                    defaultValue={calUpdate.ctitle}
                  />
                </td>
              </tr>
              <tr>
                <td className="nameLabel">
                  <label for="colorInput">색상 : </label>
                </td>
                <td>
                  <input
                    className="colorInput"
                    type="color"
                    name="colorInput"
                    ref={colorRef}
                    defaultValue={calUpdate.ccolor}
                  />
                </td>
              </tr>
              <tr>
                <td className="nameLabel">
                  <label for="dateInput">시작날짜 : </label>
                </td>
                <td>
                  <input
                    type="date"
                    name="dateInput"
                    ref={startDateRef}
                    defaultValue={calUpdate.startdate}
                  />
                </td>
              </tr>
              <tr>
                <td className="nameLabel">
                  <label for="dateInput">끝날짜 : </label>
                </td>
                <td>
                  <input
                    type="date"
                    name="dateInput"
                    ref={endDateRef}
                    defaultValue={calUpdate.enddate}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input type="submit" className="submitBtn" value="수정" />
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <input
                    className="deleteBtn"
                    type="button"
                    id={calUpdate.cnum}
                    value="삭제"
                    onClick={onDelete}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input
                    className="cancelBtn"
                    type="button"
                    value="취소"
                    onClick={() => setUpdateVisible(false)}
                  />
                </td>
              </tr>
            </table>
          </form>
        )}
      </div>
      <div
        className={visible || updateVisible ? 'blur calWrapper' : 'calWrapper'}
      >
        <div className="calendar" style={{ margin: '25px 25px' }}>
          <FullCalendar
            height="800px"
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
    </>
  );
};

export default Calendars;
