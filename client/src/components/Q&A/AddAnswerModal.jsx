import React, { useState } from 'react';
import ReactDom from 'react-dom';

const AddAnswerModal = ({ open, onClose, question, submitAnswer, product, photoWidget, images }) => {
  if (!open) { return null; }

  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" onClick={onClose} />
      <div className="modal-styles">
        <form onSubmit={(e) => submitAnswer(e)}>
          <h3 className="answer-title">Submit your Answer</h3>
          <p className="answer-subtitle"><b>{product}:</b> <em>{question}</em></p>

          <p className="modal-answer-body">
            <label>Your Answer:</label><br />
            <textarea name="answer" maxLength="1000" rows="4" cols="50" required />
          </p>

          <p className="answer-nickname">
            <label>What is your nickname:</label><br />
            <input type="text" name="name" size="60" maxLength="60" placeholder="Example: jackson11" required /><br />
            <em>For privacy reasons, do not use your full name or email address.</em>
          </p>

          <p className="answer-email">
            <label>Email:</label><br />
            <input type="email" name="email" size="60" maxLength="60" placeholder="Example: jackson11@email.com" required /><br />
            <em>For authentication reasons, you will not be emailed.</em>
          </p>

          <p className="answer-photo">
            {images.length < 5 && <button id="upload-widget" className="cloudinary-button"
              onClick={(e) => { e.preventDefault(); photoWidget.open(); }}>Upload photos</button>} <br />
            {images.length && <span>Images uploaded: {images.length}</span>}
          </p>

          <input type="submit" />
        </form>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default AddAnswerModal;