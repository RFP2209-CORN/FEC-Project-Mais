import React from 'react';
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import StarRating from '../Ratings/StarRating.jsx';

const SingleReview = ({ rating, totalReviews, review }) => {

  review.date = new Date();
  review.date = format(review.date, 'mm/dd/yyyy');
  review.photos?.slice(0, 4);

  const onPhotoClick = (event) => {
    event.preventDefault();
  }

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
      <div className="reviews-card-images">
        {review.photos.length > 0 && review.photos.map((photo) => {
          <button onClick={onPhotoClick()}>
            {photo}
          </button>
        })}
      </div>
    </>
  )
}

export default SingleReview;