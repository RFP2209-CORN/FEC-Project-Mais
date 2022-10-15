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
      totalStars += reviews[i].rating;
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
    axios.get(`/reviews/${product.id}`)
      .then(result => {
        let reviews = result.data.results;
        calcRating(reviews);
      });

    axios.get(`/products/${product.id}/styles`)
      .then(result => {
        let styles = result.data.results;

        for (let i = 0; i < styles.length; i++) {
          if (styles[i]['default?'] === true) {
            setPrice(currStyle => {
              return styles[i].original_price;
            });
            setImgURL(currImg => {
              return styles[i].photos[0].thumbnail_url;
            });
          }
        }
      });
  }, []);

  return (
    <div className="card-container">
      <img src={imgURL}/>
      <div>category {item.category}</div>
      <div>product name {item.name}</div>
      <div>price {price !== null && price}</div>
      <div>price {price === null && item.default_price}</div>
      <div>star rating {rating}</div>
    </div>
  );
};

export default RelatedItemsCard;