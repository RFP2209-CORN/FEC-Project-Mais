import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItemsCard from './RelatedItemsCard.jsx'

const RelatedItems = ({productId}) => {
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    // axios.get('/products')
    //   .then(result => console.log(result.data));

    axios.get(`/products/${40344}/related`)
      .then(result => console.log(result.data));
    // axios.get(`/reviews/${40344}`)
    //   .then(result => console.log(result.data));
    // axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/related`, {
    //   headers: {Authorization: process.env.GITHUB_API_KEY},
    // })
    //   .then(result => {
    //     console.log(result);

    //     for (let id of result.data) {
    //       axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`, {
    //         headers: {Authorization: process.env.GITHUB_API_KEY},
    //       })
    //         .then(result =>
    //           setRelatedItems(currProducts => {
    //             return [...currProducts, result.data];
    //           })
    //         );
    //     }
    //   })
    //   .catch(err => console.log(err));
  }, []);


  return (
    <div>
      {relatedItems.map((item) => {
        return <RelatedItemsCard key={item.id} item={item}/>;
      })}
    </div>
  );
};


export default RelatedItems;