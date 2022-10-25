import React from 'react';
import Overview from '../client/src/components/Overview/Overview.jsx';
import {act, cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
import axios from "axios";
import dummyData from './dummyData.js';

jest.mock('axios');

describe('Overview', () => {

  beforeEach(() => {
    axios.get
      .mockImplementationOnce(() => Promise.resolve({
        data: dummyData.product
      }))
      .mockImplementationOnce(() => Promise.resolve({
        data: dummyData.productStyles
      }));
  })

  it('image gallery renders', async () => {
    await act(async () => render(<Overview/>));

    const defaultView = await screen.getByTestId('default-view');
    expect(defaultView).toBeTruthy();

    const thumbnailNavBar = await screen.getByTestId('thumbnail-nav-bar');
    expect(thumbnailNavBar).toBeTruthy();
  })

  it('product info component renders', async () => {
    await act(async () => render(<Overview/>));

      const productCategory = await screen.getByText('JACKETS');
      expect(productCategory).toBeTruthy();

      const productName = await screen.getByText('Camo Onesie');
      expect(productName).toBeTruthy();

      const productPrice = await screen.getByText('140.00');
      expect(productPrice).toBeTruthy();
  });

  it('style selector component renders', async () => {
    await act(async () => render(<Overview/>));

    const productStyle = await screen.getByText("Forest Green & Black");
    expect(productStyle).toBeTruthy();

    const currentStyleSelected = screen.getByTestId('style0-selector');
    const checkmark = screen.getByTestId('checkmark')
    expect(currentStyleSelected.childNodes).toContain(checkmark);
  });

  it('add to cart component renders', async () => {
    await act(async () => render(<Overview/>));

    const sizeSelector = screen.getByTestId('size-selector');
    expect(sizeSelector).toBeTruthy();

    const quantitySelector = screen.getByTestId('quantity-selector');
    expect(quantitySelector).toBeTruthy();

    const addToCartButton = screen.getByTestId('add-to-cart-button');
    expect(addToCartButton).toBeTruthy();
  });

  it('handles style changes', async () => {
    await act(async () => render(<Overview/>));

    fireEvent.click(screen.getByTestId('style2'));

    const productStyle2 = await screen.getByText("Ocean Blue & Grey");
    expect(productStyle2).toBeTruthy();
  })
});
<<<<<<< HEAD


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
=======
>>>>>>> master
