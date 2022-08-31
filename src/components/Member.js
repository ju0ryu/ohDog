import '../css/member.scss';
import { useRef, useState } from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';

const Member = () => {
  const [memberlist, setMemberlist] = useState({
    memberList: [],
  });
  const memberSearchRef = useRef();
  useEffect(() => {
    axios
      .get('http://localhost:8008/admin', {})
      .then((res) => {
        console.log('res ==>', res);
        const { data } = res;
        console.log('data ==>', data);
        setMemberlist({
          memberList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const Delete = (e) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      console.log(e.target.id);
      axios
        .post('http://localhost:8008/admindelete', {
          usernum: e.target.id,
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

  const memberSearch = () => {
    console.log(memberSearchRef.current.value);
    axios
      .post('http://localhost:8008/adminSearch', {
        userid: memberSearchRef.current.value,
      })
      .then((res) => {
        const { data } = res;
        setMemberlist({
          memberList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  console.log('data ==>', memberlist);
  return (
    <div className="boardList">
      <p>회원관리</p>
      <div className="memberSearch">
        <input
          className="memberSearchBox"
          type="text"
          placeholder="회원아이디 검색"
          ref={memberSearchRef}
        />
        <input
          className="memberSearchBtn"
          type="button"
          value="검색"
          onClick={memberSearch}
        />
      </div>
      <table className="boardTable">
        <thead>
          <tr>
            {/* <th width="60">No</th> */}
            <th width="100">아이디</th>
            <th width="100">비밀번호</th>
            <th width="100">닉네임</th>
            <th width="100">전화번호</th>
            <th width="260">주소</th>
            <th width="100">생년월일</th>
            <th width="40">성별</th>
            <th width="100">삭제</th>
          </tr>
        </thead>
        <tbody>
          {memberlist.memberList.length == 0 ? (
            <td colSpan="8">
              <p>존재하지 않는 회원입니다.</p>
            </td>
          ) : (
            memberlist.memberList.map((article) => {
              return (
                <tr>
                  {/* <th width="60">{article.usernum}</th> */}
                  <th width="100">{article.userid}</th>
                  <th width="100">{article.userpw}</th>
                  <th width="100">{article.nickname}</th>
                  <th width="100">{article.tel}</th>
                  <th width="260">{article.addr}</th>
                  <th width="100">{article.birth}</th>
                  <th width="40">{article.gender}</th>
                  <th width="100">
                    <button
                      className="dbutton"
                      id={article.usernum}
                      type="button"
                      value="삭제"
                      onClick={Delete}
                    >
                      삭&nbsp;제
                    </button>
                  </th>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Member;
