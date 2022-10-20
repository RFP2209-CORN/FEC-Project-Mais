import React, { useState } from 'react';
import { format } from 'date-fns';
import StarRating from '../Ratings/StarRating.jsx';
import SingleReviewPhotoModal from './SingleReviewPhotoModal.jsx';

const SingleReview = ({ rating, totalReviews, review }) => {

  const [ openModal, setOpenModal ] = useState(false);
  const [ yes, setYes ] = useState(0);
  const [ no, setNo ] = useState(0);
  const [ yesClicked, setYesClicked ] = useState(false);

  review.date = new Date();
  review.date = format(review.date, 'mm/dd/yyyy');
  review.photos?.slice(0, 4);

  const onPhotoClick = () => {
    setOpenModal(true);
  }

  const closeModal = (event) => {
    event.stopPropagation();
    setOpenModal(false);
  };

  return (
    <>
      <div className="reviews-card">
        <div className="flexbox-container">
          <div><StarRating rating={rating} /></div>
          <div className="reviews-date">{review.reviewer_name},&nbsp;{review.date}</div>
        </div>
      </div>
      <div className="reviews-card-text">
        <h3>
          {review.summary.split('.')[0]}
        </h3>
        <p>
          {review.body}
        </p>
        <p>
          {review.recommend ? '✅ I recommend this product' : null}
        </p>
      </div>
      {/* <div className="reviews-card-images">
        {review.photos.length > 0 && review.photos.map((photo) => {
          <button onClick={onPhotoClick()}>
            {openModal &&
            <SingleReviewPhotoModal onClose={closeModal} photo={photo} />}
          </button>
        })}
      </div> */}
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
          Yes ({yes}) &nbsp;
        </div>
        <div>
          No ({no})
        </div>
      </div>
    </>
  )
}

export default SingleReview;