// Ratings Breakdown Sidebar

// state: product rating, number of reviews, number of ratings/star number

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx';

const RatingsBreakdownSidebar = ({ product_id }) => {

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0.0);
  const [fiveStar, setFiveStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [oneStar, setOneStar] = useState(0);

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344`, {
      headers: {Authorization: process.env.GITHUB_API_KEY}
    })
      .then((results) => {
        let productReviews = results.data.results;
        console.log('productReviews', productReviews);
        setReviews(productReviews);
        let totalRating = 0;
        productReviews.forEach((review) => {
          totalRating += review.rating;
        })
        let averageRating = totalRating / productReviews.length;
        averageRating = Math.round(averageRating * 10) / 10;
        setRating(averageRating);
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return (
    <div>
      <h2>
        Ratings Breakdown
      </h2>
      <h1>
        {rating} &nbsp; <StarRating rating={rating}/>
      </h1>

    <div>
    </div>
    <div>
    </div>
    <h3>
      5 star
    </h3>
    <h3>
      4 star
    </h3>
    <h3>
      3 star
    </h3>
    <h3>
      2 star
    </h3>
    <h3>
      1 star
    </h3>
    </div>
    );

}

export default RatingsBreakdownSidebar;





// Stars and Stars Ratings

// npm install react-rating-stars-component --save

