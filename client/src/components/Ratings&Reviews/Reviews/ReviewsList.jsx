import React, { useState, useEffect } from 'react';
import ReviewsSortDropdown from './ReviewsSortDropdown.jsx';
import StarRating from '../Ratings/StarRating.jsx';
import SingleReview from '../Reviews/SingleReview.jsx';

const ReviewsList = ({ reviews, handleYesClick, rating, totalNumberOfReviews }) => {

  const [ currentReviews, setCurrentReviews ] = useState([]);
  const [ currentReviewIndex, setCurrentReviewIndex ] = useState(4);
  const [ filteredReviews, setFilteredReviews ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ closeLoadButton, setCloseLoadButton ] = useState(false);
  const [ relevance, setRelevance ] = useState(false);
  const [ helpfulness, setHelpfulness ] = useState(false);
  const [ newest, setNewest ] = useState(false);

  useEffect(() => {
    updateCurrentReviewList();
  }, [relevance, helpfulness, newest, currentReviews]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const loadMoreReviews = () => {
    if (currentReviewIndex < reviews.length - 2) {
      setCurrentReviewIndex(currentReviewIndex + 2);
      setCurrentReviews(reviews.slice(0, currentReviewIndex));
    } else if (currentReviewIndex < reviews.length - 1) {
      setCurrentReviewIndex(currentReviewIndex + 1);
      setCurrentReviews(reviews.slice(0, currentReviewIndex));
      setCloseLoadButton(true);
    } else {
      setCloseLoadButton(true);
    }
  }

  const updateCurrentReviewList = () => {
    // how the review list should display
    console.log('helpfulness', helpfulness, 'newest', newest, 'relevance', relevance);
    if (helpfulness) {
      currentReviews.sort((a, b) => {
          return b.helpfulness - a.helpfulness;
      })
      console.log('current reviews sorted helpful descending', currentReviews);
      console.log('just the current helpful sorted helpful', currentReviews.map((review) => review.helpfulness));
    } else if (newest) {
      currentReviews.sort((a, b) => {
        return b.date - a.date;
      })
      console.log('current reviews sorted newest descending', currentReviews);
      console.log('current review dates sorted descending', currentReviews.map((review) => review.date));
    }

    else if (relevance) {
      currentReviews.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      }).sort((a, b) => {
        return b.date - a.date;
      });
      console.log('currentReviews relevance descending', currentReviews);
    } else {
      console.log('all values are false: current reviews list not updated');
    }
    // console.log('currentReviews after sorting', currentReviews);
    setCurrentReviews(currentReviews);
  };

  const handleHelpful = () => {

    setHelpfulness(true);
    setNewest(false);
    setRelevance(false);
    updateCurrentReviewList();

    // setCurrentReviews(currentReviews.sort((a, b) => {
    //   return b.helpfulness - a.helpfulness;
    // }));
    // console.log('current reviews sorted helpful descending', currentReviews);
    // console.log('just the current helpful sorted helpful', currentReviews.map((review) => review.helpfulness));
  }

  const handleNewest = () => {

    // setCurrentReviews(currentReviews.sort((a, b) => {
    //   return b.date - a.date;
    // }));
    // console.log('current review dates sorted descending', currentReviews.map((review) => review.date));
    setNewest(true);
    setHelpfulness(false);
    setRelevance(false);
    updateCurrentReviewList();

  }

  const handleRelevant = () => {

    setRelevance(true);
    setNewest(false);
    setHelpfulness(false);
    updateCurrentReviewList();

    // updateCurrentReviewList();
    // console.log('current reviews sorted relevance descending', currentReviews);
  }

  return (
    <>
    <div className="reviews-list-header">
      <div className="flexbox-container">
        <h2>
          {totalNumberOfReviews} Reviews, sorted by
        </h2>
        <h3>
          {/* <ReviewsSortDropdown /> */}
          <div className="sort-dropdown">
            <button className="button-dropdown" onClick={handleOpen} >relevant</button>
            {open ? (
              <ul className="sort-dropdown-menu">
                <li className="sort-dropdown-menu-item">
                  <button onClick={
                    handleHelpful
                  } >Helpful
                    </button>

                </li>
                <li className="sort-dropdown-menu-item">
                <button onClick={
                    handleNewest
                  } >Newest
                    </button>
                </li>
                <li className="sort-dropdown-menu-item">
                <button onClick={
                    handleRelevant
                  } >Relevant
                    </button>
                </li>
              </ul>
            ) : null}
          </div>
        </h3>
      </div>
    </div>
    <br></br>
    <br></br>
    <div>
      {currentReviews.length > 0
      ?
      currentReviews.map((review, index) => {
        return <SingleReview rating={rating} totalNumberOfReviews={totalNumberOfReviews} review={review} key={index} />
      })
      :
      reviews.slice(0, 2).map((review, index) => {
        return <SingleReview rating={rating} totalNumberOfReviews={totalNumberOfReviews} review={review} key={index} />
        })
      }
    </div>
    <div className="more-reviews-button">
      {!closeLoadButton &&
      // <button>
      <button onClick={loadMoreReviews}>
        Load More Reviews
      </button>}
    </div>
    </>
  )
}

export default ReviewsList;
