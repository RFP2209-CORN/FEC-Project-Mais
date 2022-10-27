import React from 'react';

const SizeSelector = ({currentStyle, skuSelected, changeSkuSelected, changeQuantitySelected, toggleMessage}) => {
  const renderSizeDropdown = () => {
    let sizes = [<option data-testid="size-null" key="defaultValue" value={false} disabled>Select Size</option>];
    for (let sku in currentStyle.skus) {
      let currentSku = currentStyle.skus[sku];
      if (Number(currentSku.quantity) > 0) {
        sizes.push(<option data-testid={`size-${currentSku.size}`} key={sku} value={sku}>{currentSku.size}</option>);
      }
    }
    if (sizes.length > 1) {
      return sizes;
    } else {
      return (<option data-testid="outOfStock" key="outOfStock" value={false} disabled>OUT OF STOCK</option>);
    }
  };

  const onSelectSize = (event) => {
    changeSkuSelected(event.target.value);
    changeQuantitySelected(1);
    toggleMessage(false);
  };

  return (
    <select data-testid="size-selector" className="size-selector cart-dropdown" value={skuSelected} onChange={onSelectSize}>
      {renderSizeDropdown()}
    </select>
  );
};

export default SizeSelector;
