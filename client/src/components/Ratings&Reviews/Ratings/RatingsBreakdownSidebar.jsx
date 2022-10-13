// Ratings Breakdown Sidebar

// state: product rating, number of reviews, number of ratings/star number

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingsBreakdownSidebar = ({ product_id }) => {

  const [overallRating, setOverallRating] = useState(0.0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${product_id}`, {
      headers: {Authorization: process.env.GITHUB_API_KEY}
    })
      .then((results) => {
        setOverallRating(results.data.rating);
      })
      .catch((error) => {
        console.log(error);
      })
  });

  return (
    <div>
      Ratings Breakdown
    </div>
  );

}

export default RatingsBreakdownSidebar;
