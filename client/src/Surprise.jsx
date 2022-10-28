import React, { useState } from 'react';
import ReactDom from 'react-dom';
import Surprise2 from './Surprise2.jsx';
import dog from './assets/images/IMG_8336.jpeg';
import cat from './assets/images/cat and candycorn.jpeg';

const Surprise = ({ open, onClose }) => {
  if (!open) { return null; }
  const [surprise2, setSurprise2] = useState(false);

  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" onClick={() => setSurprise2(true)}/>
      <div className="modal-styles">
        <img src={cat} width="1410" height="940" onClick={() => setSurprise2(true)}/>
        <Surprise2 opening={surprise2} close={onClose} />
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default Surprise;