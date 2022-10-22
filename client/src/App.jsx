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

  const updateProduct = (e, product) => {
    setProductId(product.id);
  };

  // useEffect(() => {
  //   const modules = ['relatedItemsAndOutfits', 'overview', 'qa', 'rateAndReview'];

  //   const listeners = modules.map(module => {
  //     let elem = document.getElementById(module);
  //     elem.addEventListener('click', trackClicks);
  //   });
  // }, []);



  return (
    <div>
      {/* Navbar */}
      {/* whoever finishes first */}

      {/* Overview */}
      {/* <Overview/> */}
      {/* steph */}

      {/* RelatedItems */}
      {/* <RelatedItemsAndOutfits productId={productId} updateProduct={updateProduct}/> */}
      {/* josh */}

      {/* QA */}
      {/* <QuestionsAndAnswers /> */}
      {/* hieu */}

      {/* Ratings */}
      {/* <RatingsBreakdownSidebar /> */}
      {/* <AddReview /> */}
      {/* <RatingsAndReviews /> */}
      {/* scott */}
    </div>
  );
};

export default App;