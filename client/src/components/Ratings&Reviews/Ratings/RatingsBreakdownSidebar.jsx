import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx';
import StarRatingsChart from './StarRatingsChart.jsx';

const RatingsBreakdownSidebar = ({ rating, fiveStar, fourStar, threeStar, twoStar, oneStar, totalReviews, product_id }) => {

  const handleClick = () => {
    // switch statement to handle each ratings breakdown component
    // filter reviews accordingly
  }

  return (
    <div className="sidebar">
      <h1>
        Ratings Breakdown
      </h1>
      <div className="flexbox-container">
        <h1 >
          {rating} &nbsp;
        </h1>
        <h3>
          <sup><StarRating rating={rating}/></sup>
        </h3>
      </div>
      <h3 className="flexbox-container" onClick={handleClick}>
        5 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={fiveStar} /> &nbsp; {fiveStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={handleClick}>
        4 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={fourStar} /> &nbsp; {fourStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={handleClick}>
        3 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={threeStar} /> &nbsp; {threeStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={handleClick}>
        2 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={twoStar}/> &nbsp; {twoStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={handleClick}>
        1 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={oneStar} /> &nbsp; {oneStar} reviews
      </h3>
    </div>
    );
}

export default RatingsBreakdownSidebar;

