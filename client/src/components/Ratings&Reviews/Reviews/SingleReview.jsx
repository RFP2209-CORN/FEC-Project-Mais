import React, { useState } from 'react';
import { format } from 'date-fns';
import StarRating from '../Ratings/StarRating.jsx';
import SingleReviewPhotoModal from './SingleReviewPhotoModal.jsx';
import axios from 'axios';

const SingleReview = ({ review }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [yes, setYes] = useState(0);
  const [no, setNo] = useState(0);
  const [yesClicked, setYesClicked] = useState(false);
  const [noClicked, setNoClicked] = useState(false);

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
    setNoClicked(true);
    yesClicked === false && setNo(no + 1);
  };

  const handleYesClick = () => {
    setYesClicked(true);

    noClicked === false && setYes(yes + 1);
    let id = review.review_id;
    axios.put(`/reviews/${id}/helpful`, { ...review, "helpfulness": review.helpfulness += 1 })
      .then((result) => {
      })
      .catch((error) => {
      })
  }

  return (
    <>
      <span className="overall-stars">
        <StarRating rating={review.rating} />
        <div className="reviews-date" > {review.reviewer_name}, &nbsp;  {review.date}
        </div>
      </span>
      <h3>
        {review.summary?.split('.')[0]}
      </h3>
      <div className="reviews-body">
        {review.body}
        <br />
        <br />
        {review.recommend ? '✅ I recommend this product' : null}
      </div>
      <br />
      {photos?.length > 0 && photos.map((photo, index) => {
        return (
          <span key={index}>
            <button onClick={() => setIsOpen(true)}><img src={photo.url} height="40px" width="40px" /></button>
            <SingleReviewPhotoModal open={isOpen} onClose={() => setIsOpen(false)} photo={photo} />
          </span>
        )
      })}
      <div>
        {review.response &&
          <>
            <h3>
              Response from seller:
            </h3>
            <p>
              {review.response}
            </p>
          </>
        }
      </div>
      <br />
      <div className="reviews-card-text">
        Was this review helpful?
      </div>
      <span>
        <button className="textButton" onClick={handleYesClick}>
          Yes
        </button>
        ({review.helpfulness}) &nbsp;

        <button className="textButton" onClick={handleNoClick}>
          No
        </button>
        ({no})
      </span>
      <hr />
    </>
  );
};

export default SingleReview;