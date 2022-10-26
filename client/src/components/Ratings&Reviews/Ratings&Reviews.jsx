import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RatingsBreakdownSidebar from './Ratings/RatingsBreakdownSidebar.jsx';
import AddReview from './Reviews/AddReview.jsx';
import ReviewsList from './Reviews/ReviewsList.jsx';

const RatingsAndReviews = ({ product_id }) => {

  const [ displayedReviews, setDisplayedReviews ] = useState([]);
  const [ reviews, setReviews ] = useState([]);
  const [ rating, setRating ] = useState(0.0);
  const [ fiveStar, setFiveStar ] = useState(0);
  const [ fourStar, setFourStar ] = useState(0);
  const [ threeStar, setThreeStar ] = useState(0);
  const [ twoStar, setTwoStar ] = useState(0);
  const [ oneStar, setOneStar ] = useState(0);
  const [ totalNumberOfReviews, setTotalNumberOfReviews ] = useState(0);

  const [ prodName, setProdName ] = useState('');
  const [ star, setStar ] = useState();
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const [ metaData, setMetaData ] = useState({});
  const [ products, setProducts ] = useState({});

  useEffect(() => {
    // get 100 reviews with the above product_id number
    axios.get(`/reviews/${product_id}/count`)
      .then((results) => {
        console.log('results from successful axios request to get 100 reviews by product_id', results.data.results)
        let productReviews = results.data.results;
        let totalRating = 0;
        productReviews.forEach((review) => {
          totalRating += review.rating;
        })
        let averageRating = totalRating / productReviews.length;
        averageRating = Math.round(averageRating * 10) / 10;
        setRating(averageRating);
        setReviews(productReviews);
      })
      .catch((error) => {
        console.log(error)
      })
    // get all the corresponding meta data with the given product_id
    axios.get(`/reviews/meta/${product_id}`)
    .then((results) => {
      console.log('results.data from successful axios request to get meta data', results.data);
      let individualRatings = results.data.ratings;
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
      setTotalNumberOfReviews(total);
      setMetaData(results.data);
    })
    // this call is just to get the name of the product
    axios.get(`/products/${product_id}`)
    .then((results) => {
      console.log('results.data from successful axios request to get product name', results.data);
      setProdName(results.data.name);
      setProducts(results.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  // invoked in AddReviewModal.jsx
  const addReview = (data) => {
     axios.post('/reviews', data)
      .then((response) => {
        console.log('successful axios post request from client to add a new review')
        console.log('response.data', response.data);
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  return (
    <>
    <div className="flexbox-container">
      <div className="sidebar">
        < RatingsBreakdownSidebar setDisplayedReviews={setDisplayedReviews} reviews={reviews} fiveStar={fiveStar} fourStar={fourStar} threeStar={threeStar} twoStar={twoStar} oneStar={oneStar} totalNumberOfReviews={totalNumberOfReviews} rating={rating} />
      </div>
      {displayedReviews.length > 0
      ?
      <ReviewsList displayedReviews={displayedReviews} totalNumberOfReviews=    {totalNumberOfReviews} />
      : <ReviewsList reviews={reviews} totalNumberOfReviews={totalNumberOfReviews} />
      }
    </div>
    <AddReview product_id={product_id} prodName={prodName} metaData={metaData} addReview={addReview}/>
    </>
  );
}

export default RatingsAndReviews;