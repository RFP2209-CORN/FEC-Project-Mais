import React, { useState, useEffect } from 'react';
import StarRating from '../Ratings/StarRating.jsx';
import SingleReview from '../Reviews/SingleReview.jsx';

const ReviewsList = ({ displayedReviews, reviews, handleYesClick, rating, totalNumberOfReviews }) => {

  reviews = displayedReviews || reviews;
  console.log('ReviewsList.jsx: reviews', reviews, 'displayedReviews', displayedReviews);

  const [ currentReviews, setCurrentReviews ] = useState([]);
  const [ currentReviewIndex, setCurrentReviewIndex ] = useState(4);
  const [ open, setOpen ] = useState(false);
  const [ closeLoadButton, setCloseLoadButton ] = useState(false);
  const [ relevance, setRelevance ] = useState(false);
  const [ helpfulness, setHelpfulness ] = useState(false);
  const [ newest, setNewest ] = useState(false);

  useEffect(() => {

    if (helpfulness) {
      reviews.sort((a, b) => {
          return a.helpfulness - b.helpfulness;
      })
    }
    else if (newest) {
      reviews.sort((a, b) => {
        return b.date - a.date;
      })
    }
    else if (relevance) {
      reviews.sort((a, b) => {
        return b.helpfulness - a.helpfulness;
      }).sort((a, b) => {
        return b.date - a.date;
      });
    }
    setCurrentReviews(reviews.slice(0, currentReviewIndex - 2));
  }, [relevance, helpfulness, newest]);

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


  const handleSort = (event) => {
    console.log('event.target.innerText', event.target.innerText)
    let word = event.target.innerText;
    if (word === 'Relevant') {
      setRelevance(true);
      setHelpfulness(false);
      setNewest(false);
    }
    if (word === 'Helpful') {
      setHelpfulness(true);
      setNewest(false);
      setRelevance(false);
    }
    if (word === 'Newest') {
      setNewest(true);
      setHelpfulness(false);
      setRelevance(false);
    }
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
                  <button onClick={(event) => handleSort(event)} >Helpful</button>
                </li>
                <li className="sort-dropdown-menu-item">
                <button onClick={(event) => handleSort(event)} >Newest</button>
                </li>
                <li className="sort-dropdown-menu-item">
                <button onClick={(event) => handleSort(event)} >Relevant</button>
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
        return <SingleReview totalNumberOfReviews={totalNumberOfReviews} review={review} key={index} />
      })
      :
      reviews.slice(0, 2).map((review, index) => {
        return <SingleReview totalNumberOfReviews={totalNumberOfReviews} review={review} key={index} />
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
