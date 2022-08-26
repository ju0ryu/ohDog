import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  Component,
} from 'react';
// import Gallery from "react-photo-gallery";

import Photos from './photo';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/image.scss';

// import './Style.css'

const Image = ({ handlelist }) => {
  // console.log("imgurl!!!!!!!!!!!!!!!!!!!!!", imgurl);
  // const imageRef = useRef();
  const userid = window.sessionStorage.getItem('id');
  const imgurl = useRef();
  const imgnum = useRef();
  // const imgdataRef = useRef();
  var secret = 'Y';

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

  const handleInsert = (e) => {
    console.log('handleInsert =>', imgurl.current.value);
    e.preventDefault();
    if (imgurl.current.value === '' || imgurl.current.value === undefined) {
      alert('이미지를 선택하세요!!!');
      return false;
    }

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

      <table className="imgtable" border="1" width="700px" align="center">
        <tr>
          <td>이미지</td>
          <td align="left">
            <input
              className="imgUpload"
              type="file"
              name="imageUpload"
              ref={imgurl}
              accept="image/*"
              onChange={onImage}
            />
          </td>
          <td>
            <input
              type="radio"
              name="cs_open"
              id="cs_open"
              value="Y"
              class="radio"
              onChange={onChange}
            ></input>
            <span>공개</span>&nbsp;&nbsp;
            <input
              type="radio"
              name="cs_open"
              id="cs_open"
              value="N"
              class="radio"
              onChange={onChange}
            />
            <span>비공개</span>&nbsp;
          </td>
        </tr>
        <tr>
          <td colSpan="2" align="center">
            <button
              className="send_but"
              type="submit"
              value="전송"
              onClick={handleInsert}
            >
              업로드
            </button>
            &nbsp;
            <button className="cancel_but" type="reset" value="취소">
              취소
            </button>
          </td>
        </tr>
      </table>

      <div className="container">
        {imagelist.imageList.map((article) => {
          return (
            <div>
              <Photos
                userid={article.userid}
                imgurl={'http://localhost:8008/uploads/' + article.imgurl}
                imgnum={article.imgnum}
                secret={article.secret}
              />

              <input
                className="D_but"
                id={article.imgnum}
                type="button"
                value="삭제"
                onClick={handleDelete}
              ></input>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Image;
