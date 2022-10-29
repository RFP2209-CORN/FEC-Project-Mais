import { useState } from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';

const AddToCart = ({currentStyle, skuSelected, quantitySelected, changeSkuSelected, changeQuantitySelected, failToAdd, toggleMessage})=>{
  const [cart, setCart] = useState([]);

  const onAddToCart = (event) => {
    if (!skuSelected) {
      toggleMessage(true);
    } else if (skuSelected && quantitySelected) {
      let item = { sku: skuSelected, quantity: quantitySelected };
      setCart([...cart, item]);
      changeSkuSelected(false);
      changeQuantitySelected(0);
    }
  };

  return (
    <div className="add-to-cart">
      {failToAdd ? <p style={{color: 'red'}}>Please select size</p> : null}
      <SizeSelector
        currentStyle={currentStyle}
        skuSelected={skuSelected}
        changeSkuSelected={changeSkuSelected}
        changeQuantitySelected={changeQuantitySelected}
        toggleMessage={toggleMessage}/>
      <QuantitySelector
        currentStyle={currentStyle}
        skuSelected={skuSelected}
        quantitySelected={quantitySelected}
        changeQuantitySelected={changeQuantitySelected}/>
      <br/>
      {currentStyle.skus?.null ? null :
        <button data-testid="add-to-cart-button" className="add-to-cart-button" onClick={onAddToCart}>Add to Cart</button>}
    </div>
  );
};

export default AddToCart;
