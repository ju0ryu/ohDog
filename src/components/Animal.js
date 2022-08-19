import React, { useRef, useState } from 'react';
import '../css/animal.scss';
import { useEffect } from 'react';
import axios from 'axios';

const Animal = () => {
  const [insertForm, setInsertForm] = useState(false);
  const [image_name, setImage_name] = useState('');
  const [gender, setGender] = useState();
  const [alist, setAlist] = useState();

  const userid = 'userid 01';
  const imgRef = useRef();
  const nameRef = useRef();
  const speciesRef = useRef();
  const ageRef = useRef();

  useEffect(() => {
    axios.post('http://localhost:8008/alist', { userid }).then((res) => {
      const { data } = res;
    });
  }, []);

  useEffect(() => {
    console.log(gender);
  }, [gender]);

  const genderChange = (e) => {
    setGender(e.target.value);
  };

  function onImage(e) {
    setImage_name(e.target.files[0]);
  }

  const addForm = () => {
    setInsertForm(true);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(speciesRef.current.value);
    console.log(gender);
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    axios
      .post(
        'http://localhost:8008/ainsert',
        {
          userid,
          image: image_name,
          aname: nameRef.current.value,
          agender: gender,
          aspecies: speciesRef.current.value,
          aage: ageRef.current.value,
        },
        config,
      )
      .then((res) => {
        console.log('확인');
      })
      .catch((e) => {
        console.error(e);
      });
    // window.location.reload();
    setInsertForm(false);
  };

  return (
    <div>
      <div>
        <input type="button" value="➕" onClick={addForm} />
      </div>
      <div>
        {insertForm && (
          <>
            <img src="./noimg.gif" alt="이미지" />
            <form onSubmit={formSubmit}>
              <tr></tr>
              <tr>
                <input
                  type="file"
                  name="imageUpload"
                  accept="image/*"
                  onChange={onImage}
                  ref={imgRef}
                />
              </tr>
              <tr>
                <label for="inputName">이름 : </label>
                <input type="text" name="inputName" ref={nameRef} />
              </tr>
              <tr>
                <label for="inputGender">성별 : </label>
                <input
                  type="radio"
                  name="inputGender"
                  value="M"
                  onChange={genderChange}
                />
                <label>수컷</label>
                <input
                  type="radio"
                  name="inputGender"
                  value="female"
                  onChange={genderChange}
                />
                <label>암컷</label>
              </tr>
              <tr>
                <label for="inputSpecies">견종 : </label>
                <select name="species" ref={speciesRef}>
                  <option value="">선택하기</option>
                  <option value="포메라니안">포메라니안</option>
                  <option value="말티즈">말티즈</option>
                  <option value="비숑">비숑</option>
                  <option value="스피치">스피치</option>
                  <option value="치와와">치와와</option>
                  <option value="시추">시추</option>
                  <option value="푸들">푸들</option>
                  <option value="시바견">시바견</option>
                  <option value="웰시코기">웰시코기</option>
                  <option value="닥스훈트">닥스훈트</option>
                  <option value="불독">불독</option>
                  <option value="셰퍼드">셰퍼드</option>
                  <option value="보더콜리">보더콜리</option>
                  <option value="리트리버">리트리버</option>
                  <option value="허스키">허스키</option>
                  <option value="퍼그">퍼그</option>
                  <option value="핏불테리어">핏불테리어</option>
                  <option value="치와와">치와와</option>
                  <option value="비글">비글</option>
                  <option value="사모예드">사모예드</option>
                  <option value="기타">기타</option>
                </select>
              </tr>
              <tr>
                <label for="inputAge">나이 : </label>
                <input type="number" name="inputAge" ref={ageRef} />
              </tr>
              <tr>
                <input type="submit" value="등록" />
              </tr>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Animal;
