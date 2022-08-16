import React from 'react';
import '../css/myFeedList.scss';

function MyFeedList() {
  return (
    //     <div className="update">
    //         <input type="button">수정</input>
    //     </div>
    // <div className="delete">
    //     <input type="button">삭제</input>
    // </div>
    <div>
      <table width="700px" border="1" align="center">
        <thead>
          <tr>
            <th colSpan="2" align="right" width="200">
              수정/삭제
            </th>
          </tr>
          <tr>
            <th align="left" width="100">
              ID
            </th>
            <th>내용</th>
          </tr>
          <tr>
            <th colSpan="2" align="right" width="100">
              작성일
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default MyFeedList;
