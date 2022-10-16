import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx';
import StarRatingsChart from './StarRatingsChart.jsx';

const RatingsBreakdownSidebar = ({ product_id }) => {

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0.0);
  const [fiveStar, setFiveStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [oneStar, setOneStar] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    // hardcoded product_id for now
    product_id = 40344;
    axios.get(`/reviews/${product_id}`)
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
        getMetaData();
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  const getMetaData = () => {
    // hardcoded product_id for now
    product_id = 40344;
    axios.get(`/reviews/meta/${product_id}`)
      .then((results) => {
        console.log('results.data from successful axios request to get meta data', results.data);
        let individualRatings = results.data.ratings;
        console.log('individualRatings', individualRatings);
        let total = 0;
        for (var key in individualRatings) {
          let ratings = parseInt(individualRatings[key]);
          total += ratings;
          key === '1' && setOneStar(ratings);
          key === '2' && setTwoStar(ratings);
          key === '3' && setThreeStar(ratings);
          key === '4' && setFourStar(ratings);
          key === '5' && setFiveStar(ratings);
        }
        setTotalReviews(total);
      })
  };

  const handleClick = () => {
    // switch statement to handle each ratings breakdown component
    // filter reviews accordingly
  }

  return (
    <div>
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

    <div>
    </div>
    <div>
    </div>
    <h3>
      <div className="flexbox-container" onClick={handleClick}>
        5 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={fiveStar} /> &nbsp; {fiveStar} reviews
      </div>
    </h3>
    <h3>
      <div className="flexbox-container" onClick={handleClick}>
        4 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={fourStar} /> &nbsp; {fourStar} reviews
      </div>
    </h3>
    <h3>
      <div className="flexbox-container" onClick={handleClick}>
        3 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={threeStar} /> &nbsp; {threeStar} reviews
      </div>
    </h3>
    <h3>
      <div className="flexbox-container" onClick={handleClick}>
        2 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={twoStar}/> &nbsp; {twoStar} reviews
      </div>
    </h3>
    <h3>
      <div className="flexbox-container" onClick={handleClick}>
        1 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={oneStar} /> &nbsp; {oneStar} reviews
      </div>
    </h3>
    </div>
    );
}

export default RatingsBreakdownSidebar;

