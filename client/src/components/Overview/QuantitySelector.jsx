import React from 'react';

const QuantitySelector = ({currentStyle, skuSelected, quantitySelected, changeQuantitySelected}) => {
  const renderQuantityDropdown = () => {
    if (!skuSelected) {
      return (<option data-testid="quant-null" key="defaultValue" value={0} disabled>—</option>);
    }
    let quantity = Number(currentStyle.skus[skuSelected].quantity);
    let quantities = [];
    if (quantity > 15) {
      for (let i = 1; i <= 15; i++) {
        quantities.push(<option data-testid={`quant-${i}`} key={i} value={i}>{i}</option>);
      }
    } else {
      for (let i = 1; i <= quantity; i++) {
        quantities.push(<option data-testid={`quant-${i}`} key={i} value={i}>{i}</option>);
      }
    }
    return quantities;
  };

  const onSelectQuantity = (event) => {
    changeQuantitySelected(Number(event.target.value));
  };

  return (
    <select
      data-testid="quantity-selector"
      className="quantity-selector cart-dropdown"
      value={quantitySelected}
      onChange={onSelectQuantity}>
      {renderQuantityDropdown()}
    </select>
  );
};

export default QuantitySelector;
