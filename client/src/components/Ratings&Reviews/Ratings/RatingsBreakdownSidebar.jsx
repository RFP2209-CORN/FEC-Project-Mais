import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import StarRatingsChart from './StarRatingsChart.jsx';

const RatingsBreakdownSidebar = ({ setDisplayedReviews, reviews, rating, fiveStar, fourStar, threeStar, twoStar, oneStar, totalNumberOfReviews, product_id }) => {

  const [ filteredReviews, setFilteredReviews ] = useState([]);
  const [ toggleFiveStar, setToggleFiveStar ] = useState(false);
  const [ toggleFourStar, setToggleFourStar ] = useState(false);
  const [ toggleThreeStar, setToggleThreeStar ] = useState(false);
  const [ toggleTwoStar, setToggleTwoStar ] = useState(false);
  const [ toggleOneStar, setToggleOneStar ] = useState(false);

  useEffect(() => {
    let filtered = [];
    for (let i = 0; i < reviews.length; i++) {
      if (toggleFiveStar && reviews[i].rating === 5) {
        filtered.push(reviews[i]);
      }
      if (toggleFourStar && reviews[i].rating === 4) {
        filtered.push(reviews[i]);
      }
      if (toggleThreeStar && reviews[i].rating === 3) {
        filtered.push(reviews[i]);
      }
      if (toggleTwoStar && reviews[i].rating === 2) {
        filtered.push(reviews[i]);
      }
      if (toggleOneStar && reviews[i].rating === 1) {
        filtered.push(reviews[i]);
      }
    }
    setDisplayedReviews(filtered);
  }, [toggleOneStar, toggleTwoStar, toggleThreeStar, toggleFourStar, toggleFiveStar]);


  const handleStarClick = (num) => {
    switch (num) {
      case 5:
        setToggleFiveStar(!toggleFiveStar);
        break;
      case 4:
        setToggleFourStar(!toggleFourStar);
        break;
      case 3:
        setToggleThreeStar(!toggleThreeStar);
        break;
      case 2:
        setToggleTwoStar(!toggleTwoStar);
        break;
      case 1:
        setToggleOneStar(!toggleOneStar);
        break;
      default:
        console.log('did not click anything that I can handle');
    }
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
      <h3 className="flexbox-container" onClick={() => handleStarClick(5)}>
        5 star &nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={fiveStar} /> &nbsp; {fiveStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={() => handleStarClick(4)}>
        4 star &nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={fourStar} /> &nbsp; {fourStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={() => handleStarClick(3)}>
        3 star &nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={threeStar} /> &nbsp; {threeStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={() => handleStarClick(2)}>
        2 star &nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={twoStar}/> &nbsp; {twoStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={() => handleStarClick(1)}>
        1 star &nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={oneStar} /> &nbsp; {oneStar} reviews
      </h3>
    </div>
    );
}

export default RatingsBreakdownSidebar;