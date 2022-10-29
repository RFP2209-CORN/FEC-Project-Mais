import StarRating from '../Ratings&Reviews/Ratings/StarRating.jsx';

const ProductInfo1 = ({ currentProduct, currentStyle, rating, totalReviews }) => {
  const renderPrice = () => {
    if (currentStyle?.sale_price) {
      return (
        <p>
          <span style={{ textDecoration: 'line-through red' }}>{currentStyle?.original_price}</span>
          &nbsp;
          <span style={{ color: 'red' }}>{currentStyle?.sale_price}</span>
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
      <span className="overall-stars">
        {rating ? <StarRating rating={rating} /> : null}
      </span>
      {totalReviews ?
        <a href="#rateAndReview">Read all {totalReviews} reviews</a> : null}
      <p>{currentProduct?.category?.toUpperCase()}</p>
      <h2 className="product-name" >{currentProduct?.name}</h2>
      {renderPrice()}
    </div>
  );
};

export default ProductInfo1;
