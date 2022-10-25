import React from 'react';
import Overview from '../client/src/components/Overview/Overview.jsx';
import {act, cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
import axios from "axios";
import dummyData from './dummyData.js';

// Mock axios using jest
jest.mock('axios');

// Intercept any axios requests made by the component being tested and return the mockup data instead
axios.get
  .mockImplementationOnce(() => Promise.resolve({    //<--- Replaces data from products request
    data: dummyData.products
  }))
  .mockImplementationOnce(() => Promise.resolve({   // <---- Replaces data from productStyles request
    data: dummyData.productStyles
  }));


it('ProductInfo renders and contains an id of product-info', async () => {
  // Render the widget, use act to handle any states being re-rendered
  await act( async () => render(<Overview/>));

  // Check if testID renders
    const testID = await screen.getByTestId('product-info');
    expect(testID).toBeTruthy();

  // Check if product name renders
    const productName = await screen.getByText('Camo Onesie')
    expect(productName).toBeTruthy();


  // Check if product style renders
    const productStyle = await screen.getByText("Forest Green & Black")
    expect(productStyle).toBeTruthy();
});


// import React from 'react';
// import ProductInfo from '../client/src/components/Overview/ProductInfo.jsx';
// import {cleanup, fireEvent, render} from '@testing-library/react';


// it('ProductInfo renders and contains an id of product-info', () => {
//   const widget = render(
//     <ProductInfo/>
//   )

//   expect(widget.getByTestId('product-info')).toBeTruthy()
// });

test('test', () => {
  expect(true).toBe(true);
});