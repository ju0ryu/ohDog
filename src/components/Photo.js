import '../css/image.scss';
import axios from "axios";
// import Modal from "./Modal"
import React, { useState, useCallback } from 'react';
import ImageViewer from 'react-simple-image-viewer';
import { render } from 'react-dom';
// import ImageViewer from "./Image";

const Photos = ({ userid, imgurl, secret, imgnum }) => {

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const images = [
        imgurl
    ];
    // let [ModalItem, setModalItem] = useState(false);

    const handleDelete = (e) => {
        if (window.confirm('삭제하시겠습니까?')) {
            console.log("handleDelete(imgnum) =>", imgnum);
            axios
                .post("http://localhost:8008/idelete", { imgnum: e.target.id })
                .then((res) => {
                    alert('삭제되었습니다')
                    console.log(res)
                })
                .catch((e) => {
                    console.error(e);
                });
        } else {
            alert('삭제가 취소되었습니다')
        }
        window
            .location
            .reload()

    };

    console.log("url", imgurl);

    const openImageViewer = useCallback((imgnum) => {
        setCurrentImage(imgnum);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };



    // const image = "http://localhost:8008/uploads/" + imgurl;
    return (
        <div className="out_img">
            <div className='img'>
                {images.map((imgurl, imgnum) => (
                    <img
                        src={imgurl}
                        onClick={() => openImageViewer(imgnum)}
                        width="250"
                        height="250"
                        key={imgnum}
                        // style={{ margin: '50px' }}
                        alt=""
                    />
                ))}

                {isViewerOpen && (
                    <ImageViewer
                        src={images}
                        currentIndex={currentImage}
                        disableScroll={false}
                        closeOnClickOutside={true}
                        onClose={closeImageViewer}
                    />
                )}
            </div>
        </div >

    )
}


export default Photos;