import React, { useState } from 'react';
import ReactDom from 'react-dom';

const SingleReviewPhotoModal = ({ open, onClose, photo }) => {

  if (!open) {
    return null;
  }

  console.log('open in SingleReviewPhotoModal', open);

  return ReactDom.createPortal (
    <>
      <div className="overlay-styles" onClick={onClose}></div>
        <div className="modal-styles">
          <img src={photo.url} alt="photo" className="review-photo" />

          <button onClick={onClose}>Close Image</button>
        </div>
    </>,
    document.getElementById('modal')
  );
}

export default SingleReviewPhotoModal;