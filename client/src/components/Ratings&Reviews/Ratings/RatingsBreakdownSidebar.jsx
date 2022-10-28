import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import StarRatingsChart from './StarRatingsChart.jsx';
import CharacteristicsChart from './CharacteristicsChart.jsx';

const RatingsBreakdownSidebar = ({ setDisplayedReviews, reviews, metaData, rating, fiveStar, fourStar, threeStar, twoStar, oneStar, totalNumberOfReviews, product_id }) => {

  const [ recommend, setRecommend ] = useState(0);
  const [ filteredReviews, setFilteredReviews ] = useState([]);
  const [ toggleFiveStar, setToggleFiveStar ] = useState(false);
  const [ toggleFourStar, setToggleFourStar ] = useState(false);
  const [ toggleThreeStar, setToggleThreeStar ] = useState(false);
  const [ toggleTwoStar, setToggleTwoStar ] = useState(false);
  const [ toggleOneStar, setToggleOneStar ] = useState(false);

  useEffect(() => {
    let filtered = [];
    let recs = 0;
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
    setRecommend(recs);
    setDisplayedReviews(filtered);
  }, [toggleOneStar, toggleTwoStar, toggleThreeStar, toggleFourStar, toggleFiveStar]);


  const RecommendPercentage = () => {
    let recs = 0;
    reviews.forEach((review) => {
      review.recommend && recs++;
    })
    return Math.trunc(recs/reviews.length * 100);
  }

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
    }
  }

  return (
    <>
      <div className="align-ratings-breakdown-header">
        <h2>
          Ratings Breakdown
        </h2>
      </div>
      <div className="flexbox-container">
        <h2 >
          {rating} &nbsp;&nbsp;
        </h2>
        <div>
        <sup><StarRating rating={rating}/></sup>
        </div>
      </div>
      <div className="align-ratings-breakdown-header">
        {RecommendPercentage()}% of reviews recommend this product
      </div>
      <h4 className="flexbox-container" onClick={() => handleStarClick(5)}>
        5 star &nbsp; &nbsp; &nbsp;&nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={fiveStar} /> &nbsp; {fiveStar} reviews
      </h4>
      <h4 className="flexbox-container" onClick={() => handleStarClick(4)}>
        4 star &nbsp; &nbsp; &nbsp;&nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={fourStar} /> &nbsp; {fourStar} reviews
      </h4>
      <h4 className="flexbox-container" onClick={() => handleStarClick(3)}>
        3 star &nbsp; &nbsp; &nbsp;&nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={threeStar} /> &nbsp; {threeStar} reviews
      </h4>
      <h4 className="flexbox-container" onClick={() => handleStarClick(2)}>
        2 star &nbsp; &nbsp; &nbsp;&nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={twoStar}/> &nbsp; {twoStar} reviews
      </h4>
      <h4 className="flexbox-container" onClick={() => handleStarClick(1)}>
        1 star &nbsp; &nbsp; &nbsp;&nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={oneStar} /> &nbsp; {oneStar} reviews
      </h4>
      <br />
      <br />
      <CharacteristicsChart metaData={metaData} reviews={reviews}/>
    </>
  );
}

export default RatingsBreakdownSidebar;