import React from 'react';

const SizeSelector = ({currentStyle, skuSelected, changeSkuSelected, changeQuantitySelected, setFailToAdd}) => {
  const renderSizeDropdown = () => {
    let sizes = [<option key="defaultValue" value={false} disabled>Select Size</option>];
    for (let sku in currentStyle.skus) {
      let currentSku = currentStyle.skus[sku];
      if (Number(currentSku.quantity) > 0) {
        sizes.push(<option key={sku} value={sku}>{currentSku.size}</option>);
      }
    }
    if (sizes.length > 1) {
      return sizes;
    } else {
      return (<option key="outOfStock" value={false} disabled>OUT OF STOCK</option>);
    }
  };

  const onSelectSize = (event) => {
    changeSkuSelected(event.target.value);
    changeQuantitySelected(1);
    setFailToAdd(false);
  };

  return (
    <select data-testid="size-selector" value={skuSelected} onChange={onSelectSize}>
      {renderSizeDropdown()}
    </select>
  );
};

export default SizeSelector;
