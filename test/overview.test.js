import React from 'react';
import ProductInfo from '../client/src/components/Overview/ProductInfo.jsx';
import {cleanup, fireEvent, render} from '@testing-library/react';


it('ProductInfo renders and contains an id of product-info', () => {
  const widget = render(
    <ProductInfo/>
  )

  expect(widget.getByTestId('product-info')).toBeTruthy()
});