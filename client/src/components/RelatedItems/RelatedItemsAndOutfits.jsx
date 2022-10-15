import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItems from './RelatedItems.jsx';
import OutfitCreation from './OutfitCreation.jsx';

const productId = 40351;

const RelatedItemsAndOutfits = () => {
  useEffect(() => {
    axios.get('/products')
      .then(result => console.log('all products', result))
  });

  // saleAndImageSetter goes here
  const saleAndImageSetter = (styles) => {
    for (let i = 0; i < styles.length; i++) {
      if (styles[i]['default?'] === true) {
        return {
          sale: styles[i].sale_price,
          ogPrice: styles[i].original_price,
          thumbnailURL: styles[i].photos[0].thumbnail_url
        };
      }
    }
    // if we get here, there wasn't a default style
    return {
      sale: styles[0].sale_price,
      ogPrice: styles[0].original_price,
      thumbnailURL: styles[0].photos[0].thumbnail_url
    };
  };

  // renderPrice goes here

  const calcRating = (reviews) => {
    let totalStars = 0;

    for (let i = 0; i < reviews.length; i++) {
      totalStars += reviews[i].rating;
    }
    let rating = totalStars / reviews.length;
    let floor = Math.floor(rating);
    let decimal = rating - floor;

    if (decimal <= .25) {
      return floor;
    } else if (decimal <= .5) {
      return floor + .25;
    } else if (decimal <= .75) {
      return floor + .5;
    } else {
      return floor + .75;
    }
  };

  return (
    <>
      <RelatedItems productId={productId} calcRating={calcRating} saleAndImageSetter={saleAndImageSetter}/>
      <br></br>
      <OutfitCreation productId={productId} calcRating={calcRating} saleAndImageSetter={saleAndImageSetter}/>
    </>
  );
};


export default RelatedItemsAndOutfits;