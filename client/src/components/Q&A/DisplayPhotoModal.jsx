import React from 'react';
import ReactDom from 'react-dom';

const DisplayPhotoModal = ({ photoClicked, setPhotoClicked, photo }) => {
  if (!photoClicked) { return null; }

  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" onClick={() => setPhotoClicked(false)} />
      <div className="expanded-view-modal-style">
        <button className="cancel-button" onClick={() => setPhotoClicked(false)} >X</button>

        <img src={photo.url} width="680" height="460" />
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default DisplayPhotoModal;