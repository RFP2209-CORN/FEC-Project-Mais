import React from 'react';
// import Overview from '../client/src/components/Overview/Overview.jsx';
import RelatedItemsAndOutfits from '../client/src/components/RelatedItems/RelatedItemsAndOutfits.jsx';
// import RelatedItemsCard from '../client/src/components/RelatedItems/RelatedItemsCard.jsx'
import {act, cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
import axios from "axios";
import dummyData from './dummyData.js';

// Mock axios using jest
jest.mock('axios');

// Intercept any axios requests made by the component being tested and return the mockup data instead


it('Related Items renders fully', async () => {
  // console.log(axios)
  axios.get
    .mockImplementationOnce(() => Promise.resolve({
      data: dummyData.relatedProducts
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: dummyData.product
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: dummyData.reviews
    }))
  await act( async () => render(<RelatedItemsAndOutfits/>));
})


// test('test', () => {
//   expect(true).toBe(true);
// });