import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItems from './RelatedItems.jsx';
import OutfitCreation from './OutfitCreation.jsx';

const RelatedItemsAndOutfits = () => {
  const [productId, setProductId] = useState(40344);

  const updateProduct = (e, product) => {
    console.log(product);
    setProductId(product.id);
  }

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
    return {
      sale: styles[0].sale_price,
      ogPrice: styles[0].original_price,
      thumbnailURL: styles[0].photos[0].thumbnail_url
    };
  };

  const renderPrice = (salesPrice, originalPrice) => {
    if (salesPrice) {
      return (
        <div className="card-price">
          <br></br>
          <span style={{textDecoration: 'line-through red'}}>${originalPrice}</span>
          <br></br>
          <span style={{color: 'red'}}>${salesPrice}</span>
        </div>
      );
    } else {
      return (
        <div className="card-price">${originalPrice}</div>
      );
    }
  };

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
      <RelatedItems
        productId={productId}
        calcRating={calcRating}
        saleAndImageSetter={saleAndImageSetter}
        renderPrice={renderPrice}
        updateProduct={updateProduct}
      />
      <br></br>
      <OutfitCreation
        productId={productId}
        calcRating={calcRating}
        saleAndImageSetter={saleAndImageSetter}
        renderPrice={renderPrice}
      />
    </>
  );
};


export default RelatedItemsAndOutfits;