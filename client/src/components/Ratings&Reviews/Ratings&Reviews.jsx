import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RatingsBreakdownSidebar from './Ratings/RatingsBreakdownSidebar.jsx';
import AddReview from './Reviews/AddReview.jsx';
import ReviewsList from './Reviews/ReviewsList.jsx';

const RatingsAndReviews = ({ product_id, currentProduct, rating, ratingsData, totalReviews }) => {
  console.log('rating from R&R passed down: ', rating);
  console.log('ratingsData from R&R passed down: ', ratingsData);
  console.log('totalReviews from R&R passed down: ', totalReviews);

  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  // const [rating, setRating] = useState(0.00);
  const [fiveStar, setFiveStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [oneStar, setOneStar] = useState(0);
  // const [totalNumberOfReviews, setTotalNumberOfReviews] = useState(0);

  const [prodName, setProdName] = useState('');
  const [star, setStar] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [metaData, setMetaData] = useState({});
  const [products, setProducts] = useState({});

  useEffect(() => {
    // get 100 reviews with the above product_id number
    axios.get(`/reviews/${product_id}/count`)
      .then((results) => {
        let productReviews = results.data.results;
        let totalRating = 0;
        productReviews.forEach((review) => {
          totalRating += review.rating;
        });
        let averageRating = totalRating / productReviews.length;
        averageRating = Math.round(averageRating * 10) / 10;

        // setRating(averageRating); refactored to grab average rating from meta data
        setReviews(productReviews);
      })
      .catch((error) => { console.log(err); });
    // get all the corresponding meta data with the given product_id


    // axios.get(`/reviews/meta/${product_id}`)
    //   .then(results => {
    //     let ratings = results.data.ratings;
    //     let rate = 0;
    //     let total = 0;
    //     for (let key in ratings) {
    //       total += Number(ratings[key]);
    //       rate += Number(key) * Number(ratings[key]);
    //     }
    //     rate = (Math.round((rate / total) * 4) / 4);
    //     setRating(rate);
    //     setTotalNumberOfReviews(total);

    //     // setOneStar(Number(ratings["1"]));
    //     // setTwoStar(Number(ratings["2"]));
    //     // setThreeStar(Number(ratings["3"]));
    //     // setFourStar(Number(ratings["4"]));
    //     // setFiveStar(Number(ratings["5"]));
    //   });
    // setTotalNumberOfReviews(totalReviews);


    setOneStar(ratingsData[1]);
    setTwoStar(ratingsData[2]);
    setThreeStar(ratingsData[3]);
    setFourStar(ratingsData[4]);
    setFiveStar(ratingsData[5]);

    setProdName(currentProduct.name);
    setProducts(currentProduct);

    // axios.get(`/products/${product_id}`)
    //   .then((results) => {
    //     setProdName(results.data.name);
    //     setProducts(results.data);
    //   })
    //   .catch((error) => {
    //   });
  }, [ratingsData]);

  // invoked in AddReviewModal.jsx
  const addReview = (data) => {
    axios.post('/reviews', data)
      .catch((error) => { console.log(error); });
  };

  return (
    <>
      <div className="main-flexbox-container">
        <div className="sidebar">
          < RatingsBreakdownSidebar setDisplayedReviews={setDisplayedReviews} reviews={reviews} fiveStar={fiveStar} fourStar={fourStar} threeStar={threeStar} twoStar={twoStar} oneStar={oneStar} totalNumberOfReviews={totalReviews} rating={rating} />
        </div>
        {displayedReviews.length > 0
          ?
          <ReviewsList displayedReviews={displayedReviews} totalNumberOfReviews={totalReviews} />
          : <ReviewsList reviews={reviews} totalNumberOfReviews={totalReviews} />
        }
      </div>
      <AddReview product_id={product_id} prodName={prodName} metaData={metaData} addReview={addReview} />
    </>
  );
};

export default RatingsAndReviews;
