import React from 'react';
import ReactDom from 'react-dom';

const AddAnswerModal = () => {

  return ReactDom.createPortal(
    <div>

    </div>,
    document.getElementById('modal')
  );
};

export default AddAnswerModal;