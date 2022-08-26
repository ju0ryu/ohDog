import '../css/member.scss';
import { useState } from 'react';

const Member = () => {
  axios.get('http://localhost:8008/memberlist', { num: e.target.id }).then();
  return (
    <div>
      <table width="800px" border="1" align="center">
        <thead>
          <tr>
            <th width="60">No</th>
            <th width="170">아이디</th>
            <th width="100">비밀번호</th>
            <th width="170">닉네임</th>
            <th width="100">전화번호</th>
            <th width="100">주소</th>
            <th width="100">생년월일</th>
            <th width="100">성별</th>
            <th width="100">삭제</th>
          </tr>
        </thead>
        <tbody>
          {memberlist.memberList.map((article) => {
            return (
              <tr>
                <th width="60">{article.usernum}</th>
                <th width="170">{article.userid}</th>
                <th width="100">{article.userpw}</th>
                <th width="170">{article.nickname}</th>
                <th width="100">{article.tel}</th>
                <th width="100">{article.addr}</th>
                <th width="100">{article.birth}</th>
                <th width="100">{article.gender}</th>
                <th width="100">
                  <input
                    className="delete"
                    id={article.usernum}
                    type="button"
                    value="삭제"
                    onClick={Delete}
                  ></input>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Member;
