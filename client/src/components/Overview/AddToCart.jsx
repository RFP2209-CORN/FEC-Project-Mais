import React from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';

const AddToCart = ({currentStyle, skuSelected, quantitySelected, changeSkuSelected, changeQuantitySelected}) => {
  const [cart, setCart] = React.useState([]);
  const [failToAdd, setFailToAdd] = React.useState(false);

  const onAddToCart = (event) => {
    if (!skuSelected) {
      setFailToAdd(true);
    } else if (skuSelected && quantitySelected) {
      let item = { sku: skuSelected, quantity: quantitySelected };
      setCart([...cart, item]);
    }
  };

  return (
    <div>
      {/* Add to Cart */}
      {failToAdd ? <p style={{color: 'red'}}>Please select size</p> : null}
      <SizeSelector currentStyle={currentStyle} skuSelected={skuSelected} changeSkuSelected={changeSkuSelected} changeQuantitySelected={changeQuantitySelected} setFailToAdd={setFailToAdd}/>
      <QuantitySelector currentStyle={currentStyle} skuSelected={skuSelected} quantitySelected={quantitySelected} changeQuantitySelected={changeQuantitySelected}/>
      {currentStyle.skus?.null ? null : <button onClick={onAddToCart}>Add to Cart</button>}
    </div>
  );
};

export default AddToCart;
