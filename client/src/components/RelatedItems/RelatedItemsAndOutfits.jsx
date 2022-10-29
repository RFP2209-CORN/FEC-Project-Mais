import React from 'react';
import axios from 'axios';
import RelatedItems from './RelatedItems.jsx';
import OutfitCreation from './OutfitCreation.jsx';


const RelatedItemsAndOutfits = ({ productId, updateProduct, currentProduct }) => {
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
    let rating = 0;
    let total = 0;
    for (let key in reviews) {
      total += Number(reviews[key]);
      rating += Number(key) * Number(reviews[key]);
    }
    rating = (Math.round((rating / total) * 4) / 4);
    return rating;
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
        currentProduct={currentProduct}
      />
      <br></br>
      <OutfitCreation
        productId={productId}
        calcRating={calcRating}
        saleAndImageSetter={saleAndImageSetter}
        renderPrice={renderPrice}
        updateProduct={updateProduct}
        renderBlankCards={renderBlankCards}
        product={currentProduct}
      />
    </div>
  );
};


export default RelatedItemsAndOutfits;