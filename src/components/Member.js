import '../css/member.scss';
import { useState } from 'react';
import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from '../../node_modules/react-router-dom/index';
import e from 'express';

const Member = () => {
  axios.get('http://localhost:8008/memberlist', { num: e.target.id }).then();
  return (
    <div>
      <table width="900px" border="1" align="center">
        <thead>
          <tr>
            <th width="60">no</th>
            <th width="170">id</th>
            <th width="100">pw</th>
            <th width="170">name</th>
            <th width="100">species</th>
            <th width="100">age</th>
            <th width="100">
              edit
              <input
                type="button"
                value="수정"
                // onClick={}
              ></input>
            </th>
            <th width="100">
              delete
              <input
                type="button"
                value="삭제"
                // onClick={}
              ></input>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Member;
