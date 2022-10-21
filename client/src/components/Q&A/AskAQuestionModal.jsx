import React from 'react';
import ReactDom from 'react-dom';

const AskAQuestionModal = ({ open, onClose, product }) => {
  if (!open) { return null; }

  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" onClick={onClose} />
      <div className="modal-styles">
        <form>
          <h3 className="question-title">
            Ask Your Question
          </h3>
          <p className="question-subtitle">
            About the <em>{product}</em>
          </p>

          <textarea placeholder="Ask your question" />

          <p className="question-modal-nickname">
            <input type="text" size="50" placeholder="Example: jackson11" />
            <em>For privacy reasons, do not use your full name or email address.</em>
          </p>

          <p>
            <input type="text" size="50" placeholder="example@abc.com" />
            <em>For authentication reasons, you will not be emailed.</em>
          </p>

          {/* on Click submit a post request handler */}
          <button onClick={onClose}>Submit Question</button>

        </form>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default AskAQuestionModal;