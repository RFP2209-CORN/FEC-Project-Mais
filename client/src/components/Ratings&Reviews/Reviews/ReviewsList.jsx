import React, { useState } from 'react';
import ReviewsSortDropdown from './ReviewsSortDropdown.jsx';
import StarRating from '../Ratings/StarRating.jsx';
import SingleReview from '../Reviews/SingleReview.jsx';

const ReviewsList = ({rating,  totalReviews, reviews }) => {

  console.log('reviews in ReviewsList.jsx', reviews);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="reviews-list">
      <div className="flexbox-container">
        <div className="reviews-list-header">
          <h2>
            {totalReviews} Reviews, sorted by
          </h2>
        </div>
        <h3>
          {/* <ReviewsSortDropdown /> */}
          <div className="sort-dropdown">
            <button className="button-dropdown" onClick={handleOpen} >relevance</button>
            {open ? (
              <ul className="sort-dropdown-menu">
                <li className="sort-dropdown-menu-item">
                  <button>Helpful</button>
                </li>
                <li className="sort-dropdown-menu-item">
                  <button>Newest</button>
                </li>
                <li className="sort-dropdown-menu-item">
                  <button>Relevant</button>
                </li>
              </ul>
            ) : null}
          </div>
        </h3>
      </div>
       {reviews.slice(0, 2).map((review, index) => {
        return <SingleReview rating={rating} totalReviews={totalReviews} review={review} key={index} />
       })}
    </div>
  )
}

export default ReviewsList;
