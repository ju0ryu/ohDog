import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  Component,
} from 'react';
// import Gallery from "react-photo-gallery";

import Photos from './Photo';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/image.scss';

// noImg 사진삽입되기전 이미지 올려주는거??인듯
import noImg from '../icon/noimg.gif';

// import './Style.css'

const Image = ({ handlelist }) => {
  // console.log("imgurl!!!!!!!!!!!!!!!!!!!!!", imgurl); const imageRef =
  // useRef();
  const userid = window.sessionStorage.getItem('id');
  const imgurl = useRef();
  const imgnum = useRef();
  // const imgdataRef = useRef();
  var secret = 'Y';
  //

  // 이미지 이름 const [image_name, setImage_name] = useState(''); 이미지 미리보기
  const [renderImage, setRenderImage] = useState('');

  // 공개비공개?
  const onChange = (e) => {
    // console.log(e.target.value);
    secret = e.target.value;
    console.log(secret);
  };

  // const image = [{ source:
  // 'https://images.unsplash.com/photo-1594415156038-02d665441df2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
  // }]

  const [image_name, setImage_name] = useState('');
  // 이미지 상태 추가??

  const [imagelist, setImagelist] = useState({ imageList: [] });
  const [visible, setVisible] = useState(false);

  const handleDelete = (e) => {
    if (window.confirm('삭제하시겠습니까?')) {
      console.log('handleDelete(imgnum) =>', imgnum);
      console.log('e.target.id::::::::', e.target.id);
      axios
        .post('http://localhost:8008/idelete', { imgnum: e.target.id })
        .then((res) => {
          alert('삭제되었습니다');
          console.log(res);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      alert('삭제가 취소되었습니다');
    }
    window.location.reload();
  };

  // const [imgBase64, setImgBase64] = useState(""); 이미지 미리보기?

  function onImage(e) {
    setImage_name(e.target.files[0]);
  }

  // 이미지 목록
  useEffect(() => {
    axios
      .post('http://localhost:8008/ilist', { userid })
      .then((res) => {
        console.log('res ==>', res);
        const { data } = res;
        console.log('data ==>', data);
        setImagelist({ imageList: data });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // 이미지 저장 input
  const handleInsert = (e) => {
    console.log('handleInsert =>', imgurl.current.value);
    e.preventDefault();
    if (imgurl.current.value === '' || imgurl.current.value === undefined) {
      alert('이미지를 선택하세요!!!');
      return false;
    }

    // const handleCancel = () => {
    //   window
    //     .location
    //     .reload();
    // }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    axios
      .post(
        'http://localhost:8008/iinsert',
        // 위에 url 어떻게 연결 시켜야할지 모르겠음.
        {
          userid,
          secret,
          // imgurl: imgurlRef.current.value, imgdata: imgdataRef.current.value,
          image: image_name,
        },
        config,
      )
      .then((res) => {
        console.log('handleInsert =>', res);
        alert('업로드완료');

        imgurl.current.value = '';
      })
      .catch((e) => {
        console.error(e);
      });
    window.location.reload();
  };
  // const [currentImage, setCurrentImage] = useState(0); const [viewerIsOpen,
  // setViewerIsOpen] = useState(false); 모달 생성 안됨....ㅅㅂ 모달 보내는법 알아야함. const
  // openPhoto = useCallback((event, { photo, index }) => {
  // setCurrentImage(index);   setViewerIsOpen(true); }, []); const closeImage =
  // () => {   setCurrentImage(0);   setViewerIsOpen(false); }; var aa =
  // "http://localhost:8008/uploads/" + imagelist.imageList[33].imgurl;
  // console.log(aa); console.log("imgnum", imagelist.imageList[2].imgnum);

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
  const changeVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <nav id="menu">
        <ul>
          <Link to="/myFeed">
            <li>
              <a className="myfeedlink" href="#">
                <p className="changeTitle">내 피드</p>
              </a>
            </li>
          </Link>
          <Link to="/image">
            <li>
              <a className="myphotolink" href="#">
                <p className="changeTitle">내 사진</p>
              </a>
            </li>
          </Link>
        </ul>
      </nav>
      <input
        className="imgChangeBtn"
        type="button"
        onClick={changeVisible}
        value={visible ? '취소' : '사진추가하기'}
      />
      {visible && (
        <form className="imageHoverForm">
          <table className="imgtable">
            <tr>
              <td>
                {/* 이미지 사진출력해주는거*/}

                <div className="img-preview">
                  {image_name ? (
                    <img src={renderImage} alt="비어있음" />
                  ) : (
                    <img src={noImg} alt="preview-img" />
                  )}
                </div>
              </td>
              {/* 이미지 인풋 라벨 연결할떄 인풋을 아이디로 바꿔줘야함 네임 */}
              {/* <tr > */}
              <td className="fileBox">
                <div className="fileBox_box1">
                  <label for="imgUpload">사진선택</label>
                  {/* <td align="left"> */}
                  <input
                    className="imgUpload"
                    type="file"
                    id="imgUpload"
                    ref={imgurl}
                    accept="image/*"
                    // onChange={onImage}
                    onChange={(e) => {
                      encodeFileToBase64(e.target.files[0]);
                    }}
                  />
                </div>
                {/* </td> */}
                {/* </td> */}
                {/* </tr> */}
                {/* <td> */}
                <div className="fileBox_box2">
                  <input
                    type="radio"
                    name="cs_open"
                    id="cs_open"
                    value="Y"
                    class="radio"
                    onChange={onChange}
                  ></input>
                  &nbsp;&nbsp;<span>공개</span>&nbsp;&nbsp;
                  <input
                    type="radio"
                    name="cs_open"
                    id="cs_open"
                    value="N"
                    class="radio"
                    onChange={onChange}
                  />
                  &nbsp;&nbsp;<span>비공개</span>&nbsp;
                </div>

                <div className="fileBox_box3">
                  <button
                    className="send_but"
                    type="submit"
                    value="전송"
                    onClick={handleInsert}
                  >
                    업로드
                  </button>
                  <input className="cancel_but" type="reset" value="다시선택" />
                </div>
              </td>
            </tr>
            {/* <tr> */}
            {/* <td colSpan="4" align="center"> */}

            {/* <label for="send_but">
            <input className='send_but' id="send_but" type="submit" value="업로드" onClick={handleInsert}></input>
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label for="cancel_but"></label>
          <input className='cancel_but' id="cancel_but" type="reset" value="취소" onClick={setRenderImage}></input> */}

            {/* </td> */}
            {/* </tr> */}
          </table>
        </form>
      )}

      <div className={visible ? 'blur container' : 'container'}>
        {imagelist.imageList.map((article) => {
          return (
            <div>
              <div className="D_butWrapper">
                <input
                  className="D_but"
                  id={article.imgnum}
                  type="button"
                  value="삭제"
                  onClick={handleDelete}
                ></input>
              </div>
              <Photos
                userid={article.userid}
                imgurl={'http://localhost:8008/uploads/' + article.imgurl}
                imgnum={article.imgnum}
                secret={article.secret}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Image;
