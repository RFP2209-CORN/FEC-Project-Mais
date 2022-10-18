import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import Stars from './Stars.jsx';

// requires npm install --save react-modal;

const AddReview = ( {product_id} ) => {

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

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="form-container">
      {/* <Modal> */}
        <h1>Write Your Review</h1>
        <h3>About the [Product Name here]</h3>
        <Stars setStar={setStar} />
        <form onSubmit={onSubmit}>
          <div>
            <textarea
              className="form-control"
              type="text"
              placeholder="Enter a summary of your review"
              ref={summaryRef}
            />
          </div>
          &nbsp;
          <div>
            <input
              className="form-control"
              type="text"
              placeholder="Enter the body of your review"
              ref={bodyRef}
            />
          </div>
          &nbsp;
          <div>
            <input
              className="form-control"
              // type="text" type="boolean"
              placeholder="Do you recommend this product?"
              // handle recommend boolean here
            />
          </div>
          &nbsp;
          <div>
            <input
              className="form-control"
              type="text"
              placeholder="Enter your username"
              ref={usernameRef}
            />
          </div>
           &nbsp;
           <div>
            <input
              className="form-control"
              type="text"
              placeholder="Enter your email address"
              ref={emailRef}
            />
           </div>
           &nbsp;
           <div>
            <input
              className="form-control"
              type="text"
              placeholder="Enter the characteristics"
              ref={characteristicsRef}
            />
           </div>
          <br></br>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {/* <div>{value}</div> */}
        </form>
      {/* </Modal> */}
    </div>
  )


}

export default AddReview;
