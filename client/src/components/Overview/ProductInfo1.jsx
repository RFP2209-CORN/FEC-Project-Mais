import React from 'react';
import StarRating from '../Ratings&Reviews/Ratings/StarRating.jsx';

const ProductInfo1 = ({currentProduct, currentStyle, rating, totalReviews}) => {
  const renderPrice = () => {
    if (currentStyle?.sale_price) {
      return (
        <p>
          <span style={{textDecoration: 'line-through red'}}>{currentStyle?.original_price}</span>
          <span> </span>
          <span style={{color: 'red'}}>{currentStyle?.sale_price}</span>
        </p>
      );
    } else {
      return (
        <p>{currentStyle?.original_price}</p>
      );
    }
  };

  return (
    <div>
      {rating ? <StarRating rating={rating}/> : null}
      {totalReviews ? <a href="#rateAndReview">Read all {totalReviews} reviews</a> : null}
      <p>{currentProduct?.category?.toUpperCase()}</p>
      <h1>{currentProduct?.name}</h1>
      {renderPrice()}
    </div>
  );
};

export default ProductInfo1;
