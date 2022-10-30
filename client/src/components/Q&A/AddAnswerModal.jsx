import React, { useState } from 'react';
import ReactDom from 'react-dom';

const AddAnswerModal = ({ open, onClose, question, submitAnswer, product, photoWidget, images, setImages }) => {
  if (!open) { return null; }

  const displayImageThumbnails = () => {
    return images.map(image => { return <img key={image} src={image} width="60" height="40" />; });
  };

  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" onClick={onClose} />
      <div className="modal-styles">
        <button className="cancel-button" onClick={onClose} >X</button>
        <h3 className="answer-title">Submit your Answer</h3>
        <p className="answer-subtitle"><b>{product}:</b> <em>{question}</em></p>
        <form className="qa-form" onSubmit={() => submitAnswer(event)}>
          <p className="modal-answer-body">
            <label>Your Answer:</label><br />
            <textarea name="answer" maxLength="1000" rows="4" cols="50" required />
          </p>
          <p className="answer-nickname">
            <label>What is your nickname:</label><br />
            <input type="text" name="name" size="40" maxLength="60" placeholder="Example: jackson11" required /><br />
            <em>For privacy reasons, do not use your full name or email address.</em>
          </p>
          <p className="answer-email">
            <label>Email:</label><br />
            <input type="email" name="email" size="40" maxLength="60" placeholder="Example: jackson11@email.com" required /><br />
            <em>For authentication reasons, you will not be emailed.</em>
          </p>
          <p className="answer-photo">
            {images.length < 5 && <button id="upload-widget" className="cloudinary-button"
              onClick={(e) => { e.preventDefault(); photoWidget.open(); }}>Upload photos</button>} <br />
            <em>Up to 5 photos.</em>
          </p>
          {images.length > 0 &&
            <p>
              ({images.length}) {images.length === 1 && 'image'} {images.length > 1 && 'images'} uploaded: {displayImageThumbnails()}  <button onClick={() => setImages([])}>X</button>
            </p>
          }
          <input className="submit" type="submit" />
        </form>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default AddAnswerModal;