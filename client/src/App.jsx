import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './components/Overview/Overview.jsx';
import QuestionsAndAnswers from './components/Q&A/QA.jsx';
import RelatedItemsAndOutfits from './components/RelatedItems/RelatedItemsAndOutfits.jsx';
import RatingsAndReviews from './components/Ratings&Reviews/Ratings&Reviews.jsx';
import { useTrackerUpdate } from './TrackerProvider.jsx';


const App = () => {
  const [productId, setProductId] = useState(40349);
  const trackClicks = useTrackerUpdate();

  const updateProduct = (e, prodId) => {
    setProductId(prodId);
  };

  // useEffect(() => {
  //   const modules = ['relatedItemsAndOutfits', 'overview', 'qa', 'rateAndReview'];

  //   const listeners = modules.map(module => {
  //     let elem = document.getElementById(module);
  //     elem.addEventListener('click', trackClicks);
  //   });
  // }, []);

  return (
    <>
      <div id="overview">
        <Overview/>
      </div>

      <div id="relatedItemsAndOutfits">
        <RelatedItemsAndOutfits productId={productId} updateProduct={updateProduct}/>
      </div>

      <div id="qa">
        <QuestionsAndAnswers productId={productId}/>
      </div>

      <div id="rateAndReview">
        <RatingsAndReviews />
      </div>
    </>
  );
};

export default App;