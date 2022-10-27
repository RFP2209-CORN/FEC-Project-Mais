import React from 'react';

const ProductInfo2 = ({currentProduct}) => {
  const onShare = (event) => {
    if (event.target.name === 'facebook') {
      window.open('https://facebook.com/');
    } else if (event.target.name === 'twitter') {
      window.open('https://twitter.com/');
    } else if (event.target.name === 'pinterest') {
      window.open('https://pinterest.com/');
    }
  };

  return (
    <div>
      <p><i>{currentProduct?.slogan}</i></p>
      <p>{currentProduct?.description}</p>
      <p>Features</p>
      <ul>
        {currentProduct?.features?.map(feature =>
          <li key={feature.feature}>{feature.feature + ': ' + feature.value}</li>
        )}
      </ul>
      <button name="facebook" onClick={onShare}><i className="fa-brands fa-facebook"></i> Share</button>
      <button name="twitter" onClick={onShare}><i className="fa-brands fa-twitter"></i> Tweet</button>
      <button name="pinterest" onClick={onShare}><i className="fa-brands fa-pinterest"></i> Pin</button>
    </div>
  );
};

export default ProductInfo2;
