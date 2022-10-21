import React from 'react';
import ReactDom from 'react-dom';

const AddAnswerModal = ({ open, onClose, question }) => {
  if (!open) { return null; }

  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" onClick={onClose} />
      <div className="modal-styles">
        <form>
          <h3 className="answer-title">
            Provide an Answer
          </h3>
          <p className="answer-subtitle">
            to <em>{question}</em>
          </p>

          <textarea placeholder="Your answer..." />

          <p className="answer-nickname">
            <input type="text" size="50" placeholder="Example: jackson11" />
            <em>For privacy reasons, do not use your full name or email address.</em>
          </p>

          <p>
            <input type="text" size="50" placeholder="example@abc.com" />
            <em>For authentication reasons, you will not be emailed.</em>
          </p>

          {/* Handle submit for Posting answer */}
          <button onClick={onClose}>Submit Answer</button>

        </form>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default AddAnswerModal;