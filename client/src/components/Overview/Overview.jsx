import React from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

const Overview = () => {
  const productId = '40344';
  const [currentProduct, setCurrentProduct] = React.useState({});
  const [styles, setStyles] = React.useState([]);

  React.useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}`, {
      headers: {Authorization: process.env.GITHUB_API_KEY},
    })
      .then(product => setCurrentProduct(product.data))
      .catch(err => console.log(err));

    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/styles`, {
      headers: {Authorization: process.env.GITHUB_API_KEY},
    })
      .then(styles => setStyles(styles.data.results))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      Product Overview
      <ImageGallery/>
      <ProductInfo/>
      <StyleSelector/>
      <AddToCart/>
    </div>
  );
};

export default Overview;
