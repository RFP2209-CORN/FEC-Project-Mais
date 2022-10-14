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
        for (var key in individualRatings) {
          let ratings = individualRatings[key];
          if (key === '1') {
            setOneStar(parseInt(ratings))
          } else if (key === '2') {
            setTwoStar(parseInt(ratings));
          } else if (key === '3') {
            setThreeStar(parseInt(ratings));
          } else if (key === '4') {
            setFourStar(parseInt(ratings));
          } else if (key === '5') {
            setFiveStar(parseInt(ratings));
          }
        }
      })
  };

  return (
    <div>
      <h1>
        Ratings Breakdown
      </h1>
      <h1>
        {rating} &nbsp; <StarRating rating={rating}/>
      </h1>

    <div>
    </div>
    <div>
    </div>
    <h3>
      5 star &nbsp; <StarRatingsChart />
    </h3>
    <h3>
      4 star &nbsp; <StarRatingsChart />
    </h3>
    <h3>
      3 star &nbsp; <StarRatingsChart />
    </h3>
    <h3>
      2 star &nbsp; <StarRatingsChart />
    </h3>
    <h3>
      1 star &nbsp; <StarRatingsChart />
    </h3>
    </div>
    );
}

export default RatingsBreakdownSidebar;

