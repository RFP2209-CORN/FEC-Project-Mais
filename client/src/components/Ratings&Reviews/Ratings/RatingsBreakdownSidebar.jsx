import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx';
import StarRatingsChart from './StarRatingsChart.jsx';

const RatingsBreakdownSidebar = ({ setReviews, reviews, rating, fiveStar, fourStar, threeStar, twoStar, oneStar, totalReviews, product_id }) => {

  const [ filteredReviews, setFilteredReviews ] = useState([]);
  // const [ fiveStarReviews, setFiveStarReviews ] = useState([]);
  // const [ fourStarReviews, setFourStarReviews ] = useState([]);
  // const [ threeStarReviews, setThreeStarReviews ] = useState([]);
  // const [ twoStarReviews, setTwoStarReviews ] = useState([]);
  // const [ oneStarReviews, setOneStarReviews ] = useState([]);
  const [ toggleFiveStar, setToggleFiveStar ] = useState(false);
  const [ toggleFourStar, setToggleFourStar ] = useState(false);
  const [ toggleThreeStar, setToggleThreeStar ] = useState(false);
  const [ toggleTwoStar, setToggleTwoStar ] = useState(false);
  const [ toggleOneStar, setToggleOneStar ] = useState(false);


  // console.log('filtered reviews', filteredReviews);

  // useEffect(() => {
  //   setFiveStarReviews(reviews.filter((review) => {
  //     return review.rating === 5;
  //   }));
  //   setFourStarReviews(reviews.filter((review) => {
  //     return review.rating === 4;
  //   }));
  //   setThreeStarReviews(reviews.filter((review) => {
  //     return review.rating === 3;
  //   }));
  //   setTwoStarReviews(reviews.filter((review) => {
  //     return review.rating === 2;
  //   }));
  //   setOneStarReviews(reviews.filter((review) => {
  //     return review.rating === 1;
  //   }));

  // }, [])

  const handleFiveStarClick = () => {
    setToggleFiveStar(!toggleFiveStar);
    let filtered = [];
    if (!toggleFiveStar) {
      filtered = reviews.filter((review) => {
        return review.rating === 5;
      });
      setFilteredReviews(...filteredReviews, filtered);
    } else {
      // setFilteredReviews(filteredReviews.slice(0, filteredReviews.length - filtered.length + 1));
      setFilteredReviews(filteredReviews.filter((review) => {
        return review.rating !== 5;
      }));
    }
    // setReviews(filteredReviews);
    console.log('filteredReviews five stars', filteredReviews, 'toggleFiveStar', toggleFiveStar);
  }

  const handleFourStarClick = () => {
    setToggleFourStar(!toggleFourStar);
    let filtered = [];
    if (!toggleFourStar) {
      console.log({reviews});
      filtered = reviews.filter((review) => {
        return review.rating === 4;
      })
      console.log({filtered});
      setFilteredReviews(...filteredReviews, filtered);
    } else {
      // setFilteredReviews(filteredReviews.slice(0, filteredReviews.length - filtered.length + 1));
      setFilteredReviews(filteredReviews.filter((review) => {
        return review.rating !== 4;
      }));
    }
    // setReviews(filteredReviews)
    console.log('filteredReviews four stars', filteredReviews, 'toggleFourStar', toggleFourStar);

  }

  const handleThreeStarClick = () => {
    setToggleThreeStar(!toggleThreeStar);
    let filtered = [];
    if (!toggleThreeStar) {
      filtered = reviews.filter((review) => {
        return review.rating === 3;
      })
      setFilteredReviews([...filteredReviews, filtered]);
    } else {
      filtered = filteredReviews.filter((review) => {
        return review.rating !== 3;
      })
      setFilteredReviews(filtered);
    }
    setReviews(filteredReviews)
    console.log('filteredReviews three stars', filteredReviews);

  }

  const handleTwoStarClick = () => {
    setToggleTwoStar(!toggleTwoStar);
    let filtered = [];
    if (!toggleTwoStar) {
      filtered = reviews.filter((review) => {
        return review.rating === 2;
      })
      setFilteredReviews([...filteredReviews, filtered]);
    } else {
      filtered = filteredReviews.filter((review) => {
        return review.rating !== 2;
      })
      setFilteredReviews(filtered);
    }
    setReviews(filteredReviews)
    console.log('filteredReviews two stars', filteredReviews);

  }

  const handleOneStarClick = () => {
    setToggleOneStar(!toggleOneStar);
    let filtered = [];
    if (!toggleOneStar) {
      filtered = reviews.filter((review) => {
        return review.rating === 1;
      })
      setFilteredReviews([...filteredReviews, filtered]);
    } else {
      filtered = filteredReviews.filter((review) => {
        return review.rating !== 1;
      })
      setFilteredReviews(filtered);

    }
    setReviews(filteredReviews)
    console.log('filteredReviews one star', filteredReviews);
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
        5 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={fiveStar} /> &nbsp; {fiveStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={handleFourStarClick}>
        4 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={fourStar} /> &nbsp; {fourStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={handleThreeStarClick}>
        3 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={threeStar} /> &nbsp; {threeStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={handleTwoStarClick}>
        2 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={twoStar}/> &nbsp; {twoStar} reviews
      </h3>
      <h3 className="flexbox-container" onClick={handleOneStarClick}>
        1 star &nbsp; <StarRatingsChart totalReviews={totalReviews} rating={oneStar} /> &nbsp; {oneStar} reviews
      </h3>
    </div>
    );
}

export default RatingsBreakdownSidebar;

