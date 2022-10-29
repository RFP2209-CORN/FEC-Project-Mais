import React, { useState } from 'react';
import ReactDom from 'react-dom';
import dog from './assets/images/IMG_8336.jpeg';
import cat from './assets/images/cat and candycorn.jpeg';

const Surprise2 = ({ opening, close }) => {
  if (!opening) { return null; }

  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" onClick={close} />
      <div className="modal-styles">
        <img src={dog} width="1512" height="2016" style={{ paddingTop: '30%'}} />
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default Surprise2;