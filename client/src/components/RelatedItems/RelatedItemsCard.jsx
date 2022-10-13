import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RelatedItemsCard = ({item}) => {
  const [product, setProduct] = useState(item);
  const [rating, setRating] = useState();

  // get request to update rating
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${product.id}`, {
      headers: {Authorization: process.env.GITHUB_API_KEY},
    })
      .then(result => {
        let results = result.data.results;
        let totalStars = 0;

        for (let i = 0; i < result.data.results.length; i++) {
          totalStars += results[i].rating
        }
        let rating = totalStars / results.length;
        let floor = Math.floor(rating);
        let decimal = rating - floor;

        if (decimal <= .25) {
          setRating(floor)
        } else if (decimal <= .5) {
          setRating(floor + .25)
        } else if (decimal <= .75) {
          setRating(floor + .5)
        } else {
          setRating(floor + .75)
        }
      })
  }, [])

  return (
    <div>
      <img/>
      <div>category {item.category}</div>
      <div>product name {item.name}</div>
      <div>price {item.default_price}</div>
      <div>star rating {rating}</div>
    </div>
  )
}

export default RelatedItemsCard;