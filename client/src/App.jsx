import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './components/Overview/Overview.jsx';
import QuestionsAndAnswers from './components/Q&A/QA.jsx';
import RelatedItemsAndOutfits from './components/RelatedItems/RelatedItemsAndOutfits.jsx';
// import your components

const App = () => {
// get request all relevant data

  return (
    <div>
      {/* Navbar */}
      {/* whoever finishes first */}

      {/* Overview */}
      {/* <Overview/> */}
      {/* steph */}

      {/* RelatedItems */}
      <RelatedItemsAndOutfits/>
      {/* josh */}

      {/* QA */}
      {/* <QuestionsAndAnswers /> */}
      {/* hieu */}

      {/* Ratings */}
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