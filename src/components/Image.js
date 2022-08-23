import React, { useRef, useState, useCallback, useEffect } from 'react';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from 'react-images';
import Photos from './photo';
import axios from "axios";
import { Link } from 'react-router-dom';
// import './Style.css'





const Image = ({ handlelist }) => {
  // const imageRef = useRef();
  const userid = 'userid 01';
  const imgurl = useRef();
  // const imgdataRef = useRef();
  var secret = 'Y'

  // 공개비공개?
  const onChange = (e) => {
    // console.log(e.target.value);
    secret = e.target.value;
    console.log(secret);
  };

  // const image = [{ source: 'https://images.unsplash.com/photo-1594415156038-02d665441df2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max' }]



  const [image_name, setImage_name] = useState("");
  // 이미지 상태 추가??

  const [imagelist, setImagelist] = useState({
    imageList: [],
  });

  // const [imgBase64, setImgBase64] = useState("");
  // 이미지 미리보기?

  function onImage(e) {
    setImage_name(e.target.files[0]);
  }

  // 글목록
  useEffect(() => {
    axios
      .post('http://localhost:8008/ilist', { userid })
      .then((res) => {
        console.log('res ==>', res);
        const { data } = res;
        console.log('data ==>', data);
        setImagelist({
          imageList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

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
        alert('업로드완료')

        imgurl.current.value = "";
      })
      .catch((e) => {
        console.error(e);
      });
    window.location.reload()
  }
  // const [currentImage, setCurrentImage] = useState(0);
  // const [viewerIsOpen, setViewerIsOpen] = useState(false);





  // const openPhoto = useCallback((event, { photo, index }) => {
  //   setCurrentImage(index);
  //   setViewerIsOpen(true);
  // }, []);
  // const closeImage = () => {
  //   setCurrentImage(0);
  //   setViewerIsOpen(false);
  // };
  // var aa = "http://localhost:8008/uploads/" + imagelist.imageList[33].imgurl;
  // console.log(aa);
  // console.log("imgnum", imagelist.imageList[2].imgnum);

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
          {/* 이미지 추가된 내용 */}
          {/* <div>
            {image_name && <img src={image_name} alt={onImage} />}

          </div> */}
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



      {/* 포토스 사용? */}
      {/* {
     <   photos.imageList.map((article) => {
          return (
            <태그
              이름={article}
            />>
          );
        })
      } */}
      <div>
        {imagelist.imageList.map((article) => {
          return (
            <Photos
              userid={article.userid}
              imgurl={"http://localhost:8008/uploads/" + article.imgurl}
              imgnum={article.imgnum}
              secret={article.secret}
            />


          )
        })}

      </div>




      {/* <h1 className="myheader">어떻게 연결 시키지????</h1> */}

      {/* <div className='div'><img src={aa} /> </div> */}

      {/* Galeery가 밑에 사진 뿌려주는 역활 */}
      {/* <Gallery photos={photos} onClick={openPhoto}></Gallery>


      <ModalGateway>

        
        {viewerIsOpen ? (
          <Modal onClose={closeImage}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
            
              }))}
            />
          </Modal>
        ) : null}
      
      </ModalGateway> */}
    </div >
  );
}




export default Image
