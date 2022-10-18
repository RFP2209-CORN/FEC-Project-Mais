import React from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';

const AddToCart = ({currentStyle, skuSelected, quantitySelected, changeSkuSelected, changeQuantitySelected}) => {
  const [cart, setCart] = React.useState([]);

  const onAddToCart = (event) => {
    if (skuSelected && quantitySelected) {
      let item = { sku: skuSelected, quantity: quantitySelected };
      setCart([...cart, item]);
    }
  };

  return (
    <div>
      {/* Add to Cart */}
      <SizeSelector currentStyle={currentStyle} skuSelected={skuSelected} changeSkuSelected={changeSkuSelected} changeQuantitySelected={changeQuantitySelected}/>
      <QuantitySelector currentStyle={currentStyle} skuSelected={skuSelected} quantitySelected={quantitySelected} changeQuantitySelected={changeQuantitySelected}/>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;
