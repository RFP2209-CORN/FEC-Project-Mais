import React from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

const Overview = ({productId}) => {
  //out of stock style
  // const productId = '40345';
  const [currentProduct, setCurrentProduct] = React.useState({});
  const [currentStyle, setCurrentStyle] = React.useState({});
  const [styles, setStyles] = React.useState([]);
  const [skuSelected, setSkuSelected] = React.useState(false);
  const [quantitySelected, setQuantitySelected] = React.useState(0);

  React.useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}`, {
      headers: {Authorization: process.env.GITHUB_API_KEY},
    })
      .then(product => setCurrentProduct(product.data))
      .catch(err => console.log(err));

    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/styles`, {
      headers: {Authorization: process.env.GITHUB_API_KEY},
    })
      .then(styles => {
        setStyles(styles.data.results);
        for (let i = 0; i < styles.data.results.length; i++) {
          if (styles.data.results[i]['default?']) {
            setCurrentStyle(styles.data.results[i]);
            break;
          }
        }
      })
      .catch(err => console.log(err));
  }, [productId]);

  const changeCurrentStyle = (style) => {
    setCurrentStyle(style);
  };

  const changeSkuSelected = (sku) => {
    setSkuSelected(sku);
  };

  const changeQuantitySelected = (quantity) => {
    setQuantitySelected(quantity);
  };

  return (
    <div className="product-overview">
      <ImageGallery
        currentStyle={currentStyle}/>
      <div className="overview-sidebar">
        <ProductInfo
          currentProduct={currentProduct}
          currentStyle={currentStyle}/>
        <StyleSelector
          currentStyle={currentStyle}
          styles={styles}
          changeCurrentStyle={changeCurrentStyle}
          changeSkuSelected={changeSkuSelected}
          changeQuantitySelected={changeQuantitySelected}/>
        <AddToCart
          currentStyle={currentStyle}
          skuSelected={skuSelected}
          quantitySelected={quantitySelected}
          changeSkuSelected={changeSkuSelected}
          changeQuantitySelected={changeQuantitySelected}/>
      </div>
    </div>
  );
};

export default Overview;
