<<<<<<< HEAD
import React, { useRef, useState, useCallback } from 'react';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from 'react-images';
import { photos } from './photo';
import axios from "axios";
// import './Style.css'




const App = ({ handlelist }) => {
  // const titleRef = useRef();
  // const writerRef = useRef();
  // const contentRef = useRef(); n
  const imageRef = useRef();



  const [image_name, setImage_name] = useState("");

  function onImage(e) {
    setImage_name(e.target.files[0]);
  }

  const handleInsert = (e) => {
    console.log("handleInsert =>", imageRef.current.value);
    e.preventDefault();
    if (imageRef.current.value === "" || imageRef.current.value === undefined) {
      alert("이미지를 선택하세요!!!");
      return false;
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    };

    axios
      .post(
        "http://localhost:8008/insert",
        // 위에 url 어떻게 연결 시켜야할지 모르겠음.
        {
          // title: titleRef.current.value,
          // writer: writerRef.current.value,
          // content: contentRef.current.value,
          image: image_name,
        },
        config
      )
      .then((res) => {
        console.log("handleInsert =>", res);

        imageRef.current.value = "";
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);




=======
import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { photos } from './photo';
import { Link } from 'react-router-dom';
import '../css/image.scss';

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

>>>>>>> beb8a966b80a2d33c2951ecb0afecb7989e001e3
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
<<<<<<< HEAD
      <table border="1" width="700px" align="center">

        <tr>
          <td>이미지</td>
          <td align="left">
            <input
              type="file"
              name="image"
              ref={imageRef}
              accept="image/*"
              onChange={onImage}
            />
          </td>
          {/* 이미지 추가된 내용 */}
          <div>
            {image_name && <img src={image_name} alt="preview-img" />}

          </div>
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
=======
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
>>>>>>> beb8a966b80a2d33c2951ecb0afecb7989e001e3
      <Gallery photos={photos} onClick={openPhoto}></Gallery>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeImage}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div >
  );
}
<<<<<<< HEAD



export default App
=======
export default App;
>>>>>>> beb8a966b80a2d33c2951ecb0afecb7989e001e3
