import React, { useRef, useState, useCallback, useEffect } from 'react';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from 'react-images';
import { photos } from './photo';
import axios from "axios";
import { Link } from 'react-router-dom';
// import './Style.css'




const Image = ({ handlelist }) => {
  // const imageRef = useRef();
  const userid = 'userid 01'
  const imgurl = useRef();
  // const imgdataRef = useRef();
  var secret = 'Y'



  // 시크릿 변경 공개 비공개
  const onChange = (e) => {
    // console.log(e.target.value);
    secret = e.target.value;
    console.log(secret);
  };



  const [image_name, setImage_name] = useState("");
  // 이미지 상태 추가??\


  // const [imgBase64, setImgBase64] = useState("");
  // 이미지 미리보기?




  function onImage(e) {
    setImage_name(e.target.files[0]);
  }



  // 포토 갱신???
  // const [photos, setPhotos] = useState(
  //   { Photos: [], }
  // );




  // useEffect(() => {
  //   axios
  //     .post('http://localhost:8008/ilist', { userid })
  //     .then((res) => {
  //       console.log('res ==>', res);
  //       const { data } = res;
  //       console.log('data ==>', data);
  //       setPhotos({
  //         Photos: data,
  //       });
  //       // 여기도 navigate 써야하나?
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }, []);






  const handleInsert = (e) => {
    console.log("handleInsert =>", imgurl.current.value);
    e.preventDefault();
    if (imgurl.current.value === "" || imgurl.current.value === undefined) {
      alert("이미지를 선택하세요!!!");
      return false;
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    };

    axios
      .post(
        "http://localhost:8008/iinsert",
        // 위에 url 어떻게 연결 시켜야할지 모르겠음.
        {
          userid,
          secret,
          // imgurl: imgurlRef.current.value,
          // imgdata: imgdataRef.current.value,
          image: image_name,
        },
        config
      )
      .then((res) => {
        console.log("handleInsert =>", res);
        // handlelist();
        imgurl.current.value = "";
      })
      .catch((e) => {
        console.error(e);
      });
  };




  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);





  const openPhoto = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);
  const closeImage = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };



  return (

    <div>

      <nav id="menu">
        <h1>
          <ul>
            <Link to="/myFeed">
              <li>
                <a class="feedlink" href="#">
                  MYFEED
                </a>
              </li>
            </Link>
            <Link to="/image">
              <li>
                <a class="photolink" href="#">
                  MYPHOTO
                </a>
              </li>
            </Link>
          </ul>
        </h1>
      </nav>


      <table border="1" width="700px" align="center">

        <tr>
          <td>이미지</td>
          <td align="left">
            <input
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
          {/* 이미지 추가된 내용 */}
          {/* <div>
            {image_name && <img src={image_name} alt={onImage} />}

          </div> */}


        </tr>
        <tr>
          <td colSpan="2" align="center">
            <input
              type="submit"
              value="전송"
              onClick={handleInsert}
            ></input>
            &nbsp;
            <input type="reset" value="취소"></input>
          </td>
        </tr>
      </table>


      <h1 className="myheader">어떻게 연결 시키지????</h1>


      {/* 갤러리 포토 밑에 뿌려주는거 */}
      <Gallery photos={photos} onClick={openPhoto}></Gallery>

      {/* 창뛰어주는듯? 모델게이트웨이???? */}
      <ModalGateway>

        {viewerIsOpen ? (
          <Modal onClose={closeImage}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}


      </ModalGateway>
    </div >
  );
}




export default Image

