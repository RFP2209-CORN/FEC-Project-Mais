import React, { useState, useEffect } from 'react';
import StarRating from '../Ratings/StarRating.jsx';
import AddReview from '../Reviews/AddReview.jsx';
import SingleReview from '../Reviews/SingleReview.jsx';

const ReviewsList = ({ metaData, product_id, prodName, addReview, displayedReviews, reviews, handleYesClick, rating, totalNumberOfReviews, images, setImages, photoWidget }) => {
  reviews = displayedReviews || reviews;

  const [currentReviews, setCurrentReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(4);
  const [open, setOpen] = useState(false);
  const [closeLoadButton, setCloseLoadButton] = useState(false);
  const [relevance, setRelevance] = useState(false);
  const [helpfulness, setHelpfulness] = useState(false);
  const [newest, setNewest] = useState(false);

  useEffect(() => {

    if (helpfulness) {
      reviews.sort((a, b) => {
        return a.helpfulness - b.helpfulness;
      });
    } else if (newest) {
      reviews.sort((a, b) => {
        return b.date - a.date;
      });
    } else if (relevance) {
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
  };

  const handleSort = (event) => {
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
  };

  return (
    <>
      <div className="align-reviews-list-header">
        <div className="flexbox-container">
          <h2>
            {totalNumberOfReviews} Reviews, sorted by
          </h2>
          <div className="sort-dropdown">
            <button className="button-dropdown" onClick={handleOpen} >relevance</button>
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
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="review-boxes">
        {currentReviews.length > 0
          ?
          currentReviews.map((review, index) => {
            return <SingleReview totalNumberOfReviews={totalNumberOfReviews} review={review} key={index} />;
          })
          :
          reviews.slice(0, 2).map((review, index) => {
            return <SingleReview totalNumberOfReviews={totalNumberOfReviews} review={review} key={index} />;
          })
        }
      </div>
      <span className="load-more-reviews-btn">
        {!closeLoadButton &&
          <button onClick={loadMoreReviews}>
            Load More Reviews
          </button>}
        <span className="add-review-btn">
          <AddReview product_id={product_id} prodName={prodName} metaData={metaData} addReview={addReview} photoWidget={photoWidget} images={images} setImages={setImages} />
        </span>
      </span>
    </>
  );
};

export default ReviewsList;
