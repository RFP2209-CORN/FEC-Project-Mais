import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './components/Overview/Overview.jsx';
import QuestionsAndAnswers from './components/Q&A/QA.jsx';
import RelatedItemsAndOutfits from './components/RelatedItems/RelatedItemsAndOutfits.jsx';
import RatingsAndReviews from './components/Ratings&Reviews/Ratings&Reviews.jsx';
import { useTrackerUpdate } from './TrackerProvider.jsx';

const App = () => {
  const [productId, setProductId] = useState(40344);
  const trackClicks = useTrackerUpdate();
  const [currentProduct, setCurrentProduct] = useState({});
  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);




  const updateProduct = (e, prodId) => {
    setProductId(prodId);
  };



  // Renders Everything needed for other widget to use
  // useEffect(() => {
  //   const modules = ['relatedItemsAndOutfits', 'overview', 'qa', 'rateAndReview'];

  //   const listeners = modules.map(module => {
  //     let elem = document.getElementById(module);
  //     elem.addEventListener('click', trackClicks);
  //   });

  // }, []);


  useEffect(() => {

    // Single Product
    axios.get(`/products/${productId}`)
      .then(result => setCurrentProduct(result.data))
      .catch(err => console.log(err));

    // Ratings Metadata
    axios.get(`reviews/meta/${productId}`)
      .then(results => {
        let ratings = results.data.ratings;
        let rating = 0;
        let total = 0;
        for (let key in ratings) {
          total += Number(ratings[key]);
          rating += Number(key) * Number(ratings[key]);
        }
        rating = (Math.round((rating / total) * 4) / 4);
        setRating(rating);
        setTotalReviews(total);
      })
      .catch(err => console.log(err));

  }, [productId]);

  return (
    <>
      <div id="overview">
        <Overview productId={productId} currentProduct={currentProduct} rating={rating} totalReviews={totalReviews} />
      </div>

      <div id="relatedItemsAndOutfits">
        <RelatedItemsAndOutfits productId={productId} updateProduct={updateProduct} />
      </div>

      <div id="qa">
        <QuestionsAndAnswers productId={productId} productName={currentProduct.name} />
      </div>

      {/* <div id="rateAndReview">
        <RatingsAndReviews product_id={productId} />
      </div> */}
    </>
  );
};

export default App;