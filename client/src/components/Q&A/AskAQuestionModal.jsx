import React from 'react';
import ReactDom from 'react-dom';

const AskAQuestionModal = ({ open, onClose, product }) => {
  if (!open) { return null; }

  return ReactDom.createPortal(
    <>
      <div id="overlay-styles" onClick={onClose} />
      <div id="modal-styles">
        <form>
          <p className="question-title">
            <b>Ask Your Question</b>
          </p>
          <p className="question-subtitle">
            About the {product}
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