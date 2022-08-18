import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { photos } from './photo';
import { Link } from 'react-router-dom';
import '../css/image.scss';

function App() {
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
      <Gallery photos={photos} onClick={openPhoto}></Gallery>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeImage}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
export default App;
