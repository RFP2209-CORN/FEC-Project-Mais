import React from 'react';
// import Overview from '../client/src/components/Overview/Overview.jsx';
import RelatedItemsAndOutfits from '../client/src/components/RelatedItems/RelatedItemsAndOutfits.jsx';
import {act, cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
import axios from "axios";
import dummyData from './dummyData.js';

// Mock axios using jest
jest.mock('axios');

// Intercept any axios requests made by the component being tested and return the mockup data instead
// axios.get
//   .mockImplementationOnce(() => Promise.resolve({    //<--- Replaces data from products request
//     data: dummyData.reviewProduct
//   }))


it('ProductInfo renders and contains an id of product-info', async () => {
  // Render the widget, use act to handle any states being re-rendered
  await act( async () => render(<RelatedItemsAndOutfits/>));

  // // Check if testID renders
  //   const testID = await screen.getByTestId('product-info');
  //   expect(testID).toBeTruthy();

  // // Check if product name renders
  //   const productName = await screen.getByText('Camo Onesie')
  //   expect(productName).toBeTruthy();


  // // Check if product style renders
  //   const productStyle = await screen.getByText("Forest Green & Black")
  //   expect(productStyle).toBeTruthy();
});

// test('test', () => {
//   expect(true).toBe(true);
// });