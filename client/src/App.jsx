import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './components/Overview/Overview.jsx';
import QuestionsAndAnswers from './components/Q&A/QA.jsx';
import RelatedItemsAndOutfits from './components/RelatedItems/RelatedItemsAndOutfits.jsx';
import RatingsAndReviews from './components/Ratings&Reviews/Ratings&Reviews.jsx';
// import your components


const App = () => {
  const [productId, setProductId] = useState(40344);

  const updateProduct = (e, product) => {
    console.log('Product ID:', productId);
    setProductId(product.id);
  };

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

/////EXAMPLE USING A QUERY
// useEffect(() => {
//   axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344', {
//     headers: {Authorization: process.env.GITHUB_API_KEY},
//   })
//     .then(result => console.log(result))
//     .catch(err => console.log(err))
// })

/////EXAMPLE HITTING ENDPOINT
// useEffect(() => {
//   axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', {
//     headers: {Authorization: process.env.GITHUB_API_KEY},
//   })
//     .then(result => console.log(result))
//     .catch(err => console.log(err))
// })