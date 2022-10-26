// import React from 'react';
// import RatingsAndReviews from '../client/src/components/Ratings&Reviews/Ratings&Reviews.jsx';
// import {act, cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
// import axios from "axios";
// import dummyData from './dummyData.js';

// // Mock axios using jest
// jest.mock('axios');

// // Intercept any axios requests made by the component being tested and return the mockup data instead
// axios.get
//   .mockImplementationOnce(() => Promise.resolve({    //<--- Replaces data from products request
//     data: dummyData.reviews
//   }))
//   .mockImplementationOnce(() => Promise.resolve({    //<--- Replaces data from products request
//     data: dummyData.meta
//   }))
//   .mockImplementationOnce(() => Promise.resolve({    //<--- Replaces data from products request
//     data: dummyData.products
//   }))

// it('Reviews render and contain a product id of 40349', async () => {
//   // Render the widget, use act to handle any states being re-rendered
//   await act( async () => render(<RatingsAndReviews/>));

//   // Check if product id renders
//     const product = await screen.getByText('40349')
//     expect(product).toBeTruthy();
// });

// it('Meta data renders and contains a product id of 40349', async () => {
//   // Render the widget, use act to handle any states being re-rendered
//   await act( async () => render(<RatingsAndReviews/>));

//   // Check if meta data renders
//     const product_id = await screen.getByText('40349')
//     expect(product_id).toBeTruthy();
// });

// it('Product by ID renders and contains a product named Camo Onesie', async () => {
//   // Render the widget, use act to handle any states being re-rendered
//   await act( async () => render(<RatingsAndReviews/>));

//   // Check if product name renders
//     const productName = await screen.getByText('Camo Onesie')
//     expect(productName).toBeTruthy();
// });


