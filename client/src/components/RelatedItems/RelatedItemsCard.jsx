import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RelatedItemsCard = ({item}) => {
  const [product, setProduct] = useState(item);
  const [rating, setRating] = useState();
  const [price, setPrice] = useState(null);
  const [imgURL, setImgURL] = useState();

  const calcRating = (reviews) => {
    let totalStars = 0;

    for (let i = 0; i < reviews.length; i++) {
      totalStars += reviews[i].rating
    }
    let rating = totalStars / reviews.length;
    let floor = Math.floor(rating);
    let decimal = rating - floor;

    if (decimal <= .25) {
      setRating(floor);
    } else if (decimal <= .5) {
      setRating(floor + .25);
    } else if (decimal <= .75) {
      setRating(floor + .5);
    } else {
      setRating(floor + .75);
    }
  };

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${product.id}`, {
      headers: {Authorization: process.env.GITHUB_API_KEY},
    })
      .then(result => {
        let reviews = result.data.results;
        calcRating(reviews)
      })

    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product.id}/styles`, {
      headers: {Authorization: process.env.GITHUB_API_KEY},
    })
      .then(result => {
        let styles = result.data.results;
        console.log('styles:', styles)

        for (let i = 0; i < styles.length; i++) {
          if (styles[i]['default?'] === true) {
            setPrice(currStyle => {
              return styles[i].original_price
            })
            setImgURL(currImg => {
              return styles[i].photos[0].thumbnail_url
            })
          }

        }
      })
  }, [])

  return (
    <div>
      <img src={imgURL}/>
      <div>category {item.category}</div>
      <div>product name {item.name}</div>
      <div>price {price !== null && price}</div>
      <div>price {price === null && item.default_price}</div>
      <div>star rating {rating}</div>
    </div>
  )
}

export default RelatedItemsCard;