import React from 'react';
import ReviewsSortDropdown from './ReviewsSortDropdown.jsx';

const ReviewsList = ({ totalReviews, reviews }) => {

  console.log('reviews in ReviewsList.jsx', reviews);

  return (
    <div className="reviews-list">
      <div className="flexbox-container">
        <h3>
          {totalReviews} Reviews, sorted by
          <ReviewsSortDropdown />
        </h3>
      </div>
    </div>
  )
}

export default ReviewsList;
