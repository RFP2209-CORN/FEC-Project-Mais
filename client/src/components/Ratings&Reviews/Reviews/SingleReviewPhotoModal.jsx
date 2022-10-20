import React, { useState } from 'react';
import ReactDom from 'react-dom';
import Stars from './Stars.jsx';

const SingleReviewPhotoModal = ({ onClose, photo }) => {

  const [ modalIsOpen, setIsOpen ] = useState(false);

  return ReactDom.createPortal (
    <>
      <div className="overlay-styles" onClick={onClose}></div>
      <div className="modal-styles">
        <img src={photo.url} alt="photo" />
        <button onClick={onClose}>Close Modal</button>
      </div>
    </>,
    document.getElementById('modal')
  );
}

export default SingleReviewPhotoModal;