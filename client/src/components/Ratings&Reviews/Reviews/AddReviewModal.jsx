import React, { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import Stars from './Stars.jsx';

const AddReviewModal = ({ prodName, handleSubmit, open, onClose, product_id }) => {

  const [ rating, setRating ] = useState(0);
  const [ star, setStar ] = useState();
  const [ recommend, setRecommend ] = useState(false);
  const [ photos, setPhotos ] = useState([]);
  const [ modalIsOpen, setIsOpen ] = useState(false);

  const summaryRef = useRef();
  const bodyRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const characteristicsRef = useRef();

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" onClick={onClose}></div>
      <div className="modal-styles">
        <div className="form-container">
          <h1>Write Your Review</h1>
          <h3>{`About the ${prodName}`}</h3>
          <Stars setStar={setStar} />
          <form onSubmit={handleSubmit} >
            <div>
              <textarea
                className="form-control"
                type="text"
                placeholder="Example: Best purchase ever!"
                ref={summaryRef}
              />
            </div>
            &nbsp;
            <div>
              <textarea
                className="form-control"
                type="text"
                placeholder="Why did you like the product or not?"
                ref={bodyRef}
              />
            </div>
            &nbsp;
            <div>
              <textarea
                className="form-control"
                // type="text" type="boolean"
                placeholder="Do you recommend this product?"
                // handle recommend boolean here
              />
            </div>
            &nbsp;
            <div>
              <textarea
                className="form-control"
                type="text"
                placeholder="Example: jackson11!"
                ref={usernameRef}
              />
            </div>
            &nbsp;
            <div>
              <textarea
                className="form-control"
                type="text"
                placeholder="Example: jackson11@email.com"
                ref={emailRef}
              />
            </div>
            &nbsp;
            <div>
              <textarea
                className="form-control"
                type="text"
                placeholder="Enter the characteristics"
                ref={characteristicsRef}
              />
            </div>
            <br></br>
            <input type="submit" className="btn-modal">

            </input>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('modal')
  );
}

export default AddReviewModal;