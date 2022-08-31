import React, { useRef, useState } from 'react';
import '../css/animal.scss';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import noImg from '../icon/noimg.gif';

const Animal = () => {
  const [insertForm, setInsertForm] = useState(false);
  const [image_name, setImage_name] = useState('');
  const [renderImage, setRenderImage] = useState('');
  const [gender, setGender] = useState();
  const [alist, setAlist] = useState();
  const [article, setArticle] = useState({
    Article: [],
  });

  const userid = window.sessionStorage.getItem('id');
  const imgRef = useRef();
  const nameRef = useRef();
  const speciesRef = useRef();
  const ageRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    window.sessionStorage.getItem('id');
    if (window.sessionStorage.getItem('id') == null) {
      alert('로그인 후 이용하여 주세요');
      navigate('/');
    }
  }, []);

  useEffect(() => {
    console.log('article :', article.Article);
  }, [article]);

  useEffect(() => {
    axios
      .post('http://localhost:8008/alist', { userid })
      .then((res) => {
        const { data } = res;
        setArticle({
          Article: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    console.log(gender);
  }, [gender]);

  const genderChange = (e) => {
    setGender(e.target.value);
  };

  const encodeFileToBase64 = (fileBlob) => {
    setImage_name(fileBlob);
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setRenderImage(reader.result);

        resolve();
      };
    });
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
    console.log('사진', image_name);
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
        window.location.reload();
      })
      .catch((e) => {
        console.error(e);
      });
    setInsertForm(false);
  };

  const deleteArticle = (e) => {
    if (window.confirm('삭제하시겠습니까?')) {
      console.log(e.target.id);
      axios
        .post('http://localhost:8008/adelete', { anum: e.target.id })
        .then((res) => {
          alert('삭제되었습니다');
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert('삭제가 취소되었습니다');
    }
  };

  return (
    <div>
      <div className="animalTitle">
        <p>마이펫 등록</p>
      </div>
      <div className={insertForm ? 'blur' : ''}>
        {article.Article.length != 0 ? (
          <div className="updateDataWrapper">
            {article.Article.map((article) => {
              return (
                <div className="updateData">
                  <div className="animalName">
                    <p>{article.aname}</p>
                  </div>
                  <table>
                    <tr>
                      <td colSpan="2">
                        <img
                          src={`http://localhost:8008/uploads/${article.aimg}`}
                          alt=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>성별 : </td>
                      <td>{article.agender == 'M' ? '수컷 ♂' : '암컷 ♀'}</td>
                    </tr>
                    <tr>
                      <td>견종 : </td>
                      <td>{article.aspecies}</td>
                    </tr>
                    <tr>
                      <td>나이 : </td>
                      <td>{`${article.aage} 살`}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <input
                          className="deleteBtn"
                          type="button"
                          value="삭제"
                          id={article.anum}
                          onClick={deleteArticle}
                        />
                      </td>
                    </tr>
                  </table>
                </div>
              );
            })}
            <div className="addForm">
              <input type="button" value="➕" onClick={addForm} />
            </div>
          </div>
        ) : (
          <div className="addForms">
            <input type="button" value="➕" onClick={addForm} />
          </div>
        )}
      </div>
      {/* <div> */}
      {insertForm && (
        <>
          {/* <img src={onImage} alt="이미지" /> */}
          <form className="hoverForms" onSubmit={formSubmit}>
            <div className="preview">
              {image_name ? (
                <img src={renderImage} alt="preview-img" />
              ) : (
                <img src={noImg} alt="preview-img" />
              )}
            </div>
            <table>
              {/* <div className="fileBox"> */}
              <tr className="fileBox">
                <td colSpan="2">
                  <label for="imageUpload">사진선택</label>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    // onChange={onImage}
                    onChange={(e) => {
                      encodeFileToBase64(e.target.files[0]);
                    }}
                    ref={imgRef}
                  />
                </td>
              </tr>
              {/* </div> */}
              <tr>
                <td>
                  <label for="inputName">이름 : </label>
                </td>
                <td>
                  <input type="text" name="inputName" ref={nameRef} />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="inputGender">성별 : </label>
                </td>
                <div className="select">
                  <td>
                    <input
                      id="male"
                      type="radio"
                      name="inputGender"
                      value="M"
                      onChange={genderChange}
                    />
                    <label for="male">수컷</label>
                  </td>
                  <td>
                    <input
                      id="female"
                      type="radio"
                      name="inputGender"
                      value="F"
                      onChange={genderChange}
                    />
                    <label for="female">암컷</label>
                  </td>
                </div>
              </tr>
              <tr>
                <td>
                  <label for="inputSpecies">견종 : </label>
                </td>
                <td>
                  <select
                    // size="5"
                    className="selectSpecies"
                    name="species"
                    ref={speciesRef}
                  >
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
                </td>
              </tr>
              <tr>
                <td>
                  <label for="inputAge">나이 : </label>
                </td>
                <td>
                  <input type="number" name="inputAge" ref={ageRef} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input className="submitBtn" type="submit" value="등록" />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input
                    className="cancelBtn"
                    type="button"
                    value="취소"
                    onClick={() => setInsertForm(false)}
                  />
                </td>
              </tr>
            </table>
          </form>
        </>
      )}
      {/* </div> */}
    </div>
  );
};

export default Animal;
