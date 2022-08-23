import axios from "axios";
import React, { useEffect, useState, useRef } from 'react';

const Fcommant = ({}) = {

   const [fccommentValue, setFccommentValue] = useState();
    
  const [fccontentlist, setFccontentList] = useState({
    fccotentList: [],
  });
    
    const onChange = (e) => {
    setFccommentValue(e.target.value);
  };
    
useEffect(() => {
  console.log(fccommentValue);
}, [fccommentValue]);

const fccontentInsert = (e) => {
  e.preventDefault();
  console.log('비교: ', fccommentValue);
  axios
    .post('http://localhost:8008/fccontentinsert', {
      userid,
      fccontent: fccommentValue,
      fnum: e.target.id,
    })
    .then((res) => {
      console.log('fcinsert=>', res);
      setFccommentValue('');
    })
    .catch((e) => {
      console.error(e);
    });
};

  const commantList = (e) => {
    console.log('피드 넘버 : ', e.target.id);
    setVisible(!visible);

    axios
      .post('http://localhost:8008/fccontentlist', { fnum: e.target.id })
      .then((res) => {
        const { data } = res;
        console.log('data : ', data);
        setFccontentList({
          fccontentList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

return (
     <div>
<form id={mainlist.fnum} onSubmit={fccontentInsert}>
  <table>
    <tr>
      <td>{fclist.useid}</td>
      <td>{fclist.fcontent}</td>
      <td>{fclist.fcdate}</td>
    </tr>
    <tr>
      <td align="right" colSpan="2">
        <input
          type="text"
          name="comment"
          size="40"
          defaultValue=""
          placeholder="댓글달기"
          onChange={onChange}
        />
      </td>
      <td>
        <input type="submit" value="작성"></input>
      </td>
    </tr>
  </table>
        </form>
    </div>
 );   
};

export default Fcommant;



