import React, { useState } from 'react';
import { format } from 'date-fns';
import StarRating from '../Ratings/StarRating.jsx';
import SingleReviewPhotoModal from './SingleReviewPhotoModal.jsx';
import axios from 'axios';

const SingleReview = ({ review }) => {

  const [ isOpen, setIsOpen ] = useState(false);
  const [ yes, setYes ] = useState(0);
  const [ no, setNo ] = useState(0);
  const [ yesClicked, setYesClicked ] = useState(false);
  const [ noClicked, setNoClicked ] = useState(false);

  review.date = new Date();
  review.date = format(review.date, 'mm/dd/yyyy');
  review.photos?.slice(0, 4);
  let photos = review.photos;

  const onPhotoClick = () => {
    setOpenModal(true);
  }

  const closeModal = (event) => {
    event.stopPropagation();
    setOpenModal(false);
  };

  const handleNoClick = () => {
    yesClicked === false && setNo(no + 1);
    setNoClicked(true);
    let id = review.review_id;
    axios.put(`/reviews/${id}/helpful`, {...review, "helpfulness": review.helpfulness -= 1})
      .then((result) => {
        console.log('result', result);
      })
      .catch((error) => {
        console.log('error', error);
      })
  };

  const handleYesClick = () => {
    noClicked === false && setYes(yes + 1);
    setYesClicked(true);
    let id = review.review_id;
    axios.put(`/reviews/${id}/helpful`, {...review, "helpfulness": review.helpfulness += 1})
      .then((result) => {
        console.log('result', result);
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  return (
    <>
      <div className="reviews-card">
        <div className="flexbox-container">
          <div><StarRating rating={review.rating} /></div>
          <div className="reviews-date">{review.reviewer_name},&nbsp;{review.date}</div>
        </div>
      </div>
      <div className="reviews-card-text">
        <h3>
          {review.summary?.split('.')[0]}
        </h3>
        <p>
          {review.body}
        </p>
        <p>
          {review.recommend ? '✅ I recommend this product' : null}
        </p>
      </div>
      <div>
      {photos?.length > 0 && photos.map((photo, index) => {
        return (
          <div key={index}>
            <button className="reviews-image-button"onClick={() => setIsOpen(true)}>Open Image</button>
            <SingleReviewPhotoModal  open={isOpen} onClose={() => setIsOpen(false)} photo={photo} />
          </div>
        )
      })}
       </div>
      {review.response &&
        <div className="reviews-card-response">
          <h3>
            Response from seller:
          </h3>
          <p>
            {review.response}
          </p>
        </div>
      }
      <div className="flexbox-container">
        <div className="reviews-card-text">
          Was this review helpful?
        </div>
        <div>
          <button className="textButton" onClick={handleYesClick}>
            Yes
          </button>
          ({review.helpfulness}) &nbsp;
        </div>
        <div>
          <button className="textButton" onClick={handleNoClick}>
            No
          </button>
          ({no})
        </div>
      </div>
    </>
  )
}

export default SingleReview;