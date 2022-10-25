import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import StarRatingsChart from './StarRatingsChart.jsx';

const RatingsBreakdownSidebar = ({ setDisplayedReviews, reviews, rating, fiveStar, fourStar, threeStar, twoStar, oneStar, totalNumberOfReviews, product_id }) => {

  const [ filteredReviews, setFilteredReviews ] = useState([]);
  const [ toggleFiveStar, setToggleFiveStar ] = useState(false);
  const [ toggleFourStar, setToggleFourStar ] = useState(false);
  const [ toggleThreeStar, setToggleThreeStar ] = useState(false);
  const [ toggleTwoStar, setToggleTwoStar ] = useState(false);
  const [ toggleOneStar, setToggleOneStar ] = useState(true);

  const handleFiveStarClick = () => {
    setToggleFiveStar(!toggleFiveStar);
    let filtered = [];
    if (toggleFiveStar) {
      filtered = reviews.filter((review) => {
        return review.rating === 5;
      });
      setFilteredReviews([...filteredReviews, ...filtered]);
    }
     else {
      let tempArray = [...filteredReviews];
      filtered = tempArray.filter((review) => {
        return review.rating !== 5;
      })
      setFilteredReviews(filtered);
    }

    setDisplayedReviews(filteredReviews);
    console.log('filteredReviews five stars', filteredReviews, 'toggleFiveStar', toggleFiveStar);
  }

  const handleFourStarClick = () => {
    setToggleFourStar(!toggleFourStar);
    let filtered = [];
    if (toggleFourStar) {
      filtered = reviews.filter((review) => {
        return review.rating === 4;
      });
      setFilteredReviews([...filteredReviews, ...filtered]);
    }
    else {
      let tempArray = [...filteredReviews];
      filtered = tempArray.filter((review) => {
        return review.rating !== 4;
      })
      setFilteredReviews(filtered);
      // console.log('filteredReviews', filteredReviews)
    }

    // this line breaks it: need to refactor
    setDisplayedReviews(filteredReviews);
    console.log('filteredReviews four stars', filteredReviews, 'toggleFourStar', toggleFourStar);
  }

  const handleThreeStarClick = () => {
    setToggleThreeStar(!toggleThreeStar);
    let filtered = [];
    if (toggleThreeStar === true) {
      filtered = reviews.filter((review) => {
        return review.rating === 3;
      });
      setFilteredReviews([...filteredReviews, ...filtered]);
    }
    else {
      let tempArray = [...filteredReviews];
      filtered = tempArray.filter((review) => {
        return review.rating !== 3;
      })
      setFilteredReviews(filtered);
      // console.log('filteredReviews', filteredReviews)
    }

    // this line breaks it: need to refactor
    setDisplayedReviews(filteredReviews);
    console.log('filteredReviews Three stars', filteredReviews, 'toggleThreeStar', toggleThreeStar);
  }

  const handleTwoStarClick = () => {
    setToggleTwoStar(!toggleTwoStar);
    let filtered = [];
    if (toggleTwoStar) {
      filtered = reviews.filter((review) => {
        return review.rating === 2;
      });
      setFilteredReviews([...filteredReviews, ...filtered]);
    } else {
      let tempArray = [...filteredReviews];
      filtered = tempArray.filter((review) => {
        return review.rating !== 2;
      })
      setFilteredReviews(filtered);
      // console.log('filteredReviews', filteredReviews)
    }

    // this line breaks it: need to refactor
    setDisplayedReviews(filteredReviews);
    console.log('filteredReviews Two stars', filteredReviews, 'toggleTwoStar', toggleTwoStar);
  }

  const handleOneStarClick = () => {
    console.log('toggleOneStar', toggleOneStar);
    console.log('toggleOneStar === true', toggleOneStar === true)
    if (toggleOneStar === true) {
      console.log('inside of if statement- true')
      let filtered = reviews.filter((review) => {
        return review.rating === 1;
      });
      console.log('filtered inside of if statement', filtered)
      setFilteredReviews(filteredReviews => ([...filteredReviews, ...filtered]));
      console.log('filteredReviews inside of if statement', filteredReviews)
    } else {
      console.log('inside of else statement - false')

      let tempArray = [...filteredReviews];
      let filtered = tempArray.filter((review) => {
        return review.rating !== 1;
      })
      setFilteredReviews(filtered);
    }
    setToggleOneStar(!toggleOneStar);
    console.log('filteredReviews one star outside of if statement', filteredReviews)
    setDisplayedReviews(filteredReviews);
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
      <h3 className="flexbox-container" onClick={handleFiveStarClick}>
        5 star &nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={fiveStar} /> &nbsp; {fiveStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={handleFourStarClick}>
        4 star &nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={fourStar} /> &nbsp; {fourStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={handleThreeStarClick}>
        3 star &nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={threeStar} /> &nbsp; {threeStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={handleTwoStarClick}>
        2 star &nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={twoStar}/> &nbsp; {twoStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={handleOneStarClick}>
        1 star &nbsp; <StarRatingsChart totalNumberOfReviews={totalNumberOfReviews} rating={oneStar} /> &nbsp; {oneStar} reviews
      </h3>
    </div>
    );
}

export default RatingsBreakdownSidebar;

