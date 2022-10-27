import React from 'react';
import axios from 'axios';
import RelatedItems from './RelatedItems.jsx';
import OutfitCreation from './OutfitCreation.jsx';


const RelatedItemsAndOutfits = ({ productId, updateProduct }) => {
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

  const renderBlankCards = (objectLength) => {
    if (objectLength === 0) {
      return (
        <>
          <div className="card card-shadow"></div>
          <div className="card card-shadow"></div>
          <div className="card card-shadow"></div>
        </>
      );
    } else if (objectLength === 1) {
      return (
        <>
          <div className="card card-shadow"></div>
          <div className="card card-shadow"></div>
        </>
      );
    } else if (objectLength === 2) {
      return (
        <>
          <div className="card card-shadow"></div>
        </>
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
    <div className="related-items-and-outfits-container">
      <br></br>
      <RelatedItems
        productId={productId}
        calcRating={calcRating}
        saleAndImageSetter={saleAndImageSetter}
        renderPrice={renderPrice}
        updateProduct={updateProduct}
        renderBlankCards={renderBlankCards}
      />
      <br></br>
      <OutfitCreation
        productId={productId}
        calcRating={calcRating}
        saleAndImageSetter={saleAndImageSetter}
        renderPrice={renderPrice}
        updateProduct={updateProduct}
        renderBlankCards={renderBlankCards}
      />
    </div>
  );
};


export default RelatedItemsAndOutfits;