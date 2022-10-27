import React from 'react';
import Overview from '../client/src/components/Overview/Overview.jsx';
import {act, cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
import axios from 'axios';
import dummyData from './dummyData.js';

// jest.mock('axios');

// describe('Overview', () => {

  beforeEach(() => {
    axios.get
      .mockImplementationOnce(() => Promise.resolve({
        data: dummyData.productStyles
      }));
  });

  it('image gallery component renders', async () => {
    await act(async () => render(<Overview currentProduct={dummyData.product} rating={3.75} totalReviews={1000}/>));

//     const defaultView = await screen.getByTestId('default-view');
//     expect(defaultView).toBeTruthy();

    const thumbnailNavBar = await screen.getByTestId('thumbnail-nav-bar');
    expect(thumbnailNavBar).toBeTruthy();
  });

  it('product info component renders', async () => {
    await act(async () => render(<Overview currentProduct={dummyData.product} rating={3.75} totalReviews={1000}/>));

    const productCategory = await screen.getByText('JACKETS');
    expect(productCategory).toBeTruthy();

    const productName = await screen.getByText('Camo Onesie');
    expect(productName).toBeTruthy();

    const productPrice = await screen.getByText('140.00');
    expect(productPrice).toBeTruthy();
  });

  it('style selector component renders', async () => {
    await act(async () => render(<Overview currentProduct={dummyData.product} rating={3.75} totalReviews={1000}/>));

    const productStyle = await screen.getByText('Forest Green & Black');
    expect(productStyle).toBeTruthy();

    const currentStyleSelected = screen.getByTestId('style0-selector');
    const checkmark = screen.getByTestId('checkmark');
    expect(currentStyleSelected.childNodes).toContain(checkmark);
  });

  it('add to cart component renders', async () => {
    await act(async () => render(<Overview currentProduct={dummyData.product} rating={3.75} totalReviews={1000}/>));

//     const sizeSelector = screen.getByTestId('size-selector');
//     expect(sizeSelector).toBeTruthy();

//     const quantitySelector = screen.getByTestId('quantity-selector');
//     expect(quantitySelector).toBeTruthy();

//     const addToCartButton = screen.getByTestId('add-to-cart-button');
//     expect(addToCartButton).toBeTruthy();
//   });

  it('handles style changes', async () => {
    await act(async () => render(<Overview currentProduct={dummyData.product} rating={3.75} totalReviews={1000}/>));

//     fireEvent.click(screen.getByTestId('style2'));

    const productStyle2 = await screen.getByText('Ocean Blue & Grey');
    expect(productStyle2).toBeTruthy();
  });

  it('handles add to cart with no size selected', async () => {
    await act(async () => render(<Overview currentProduct={dummyData.product} rating={3.75} totalReviews={1000}/>));

//     const selectSizePropmt = await screen.queryByText('Please select size');
//     expect(selectSizePropmt).toBeFalsy();

//     fireEvent.click(screen.getByTestId('add-to-cart-button'));

//     const selectSizePropmt2 = await screen.getByText('Please select size');
//     expect(selectSizePropmt2).toBeTruthy();

//     fireEvent.change(screen.getByTestId('size-selector'), { target: { value: 1394769 } });

//     const selectSizePropmt3 = await screen.queryByText('Please select size');
//     expect(selectSizePropmt3).toBeFalsy();
//   });

  it('handles size & quantity selecting', async () => {
    await act(async () => render(<Overview currentProduct={dummyData.product} rating={3.75} totalReviews={1000}/>));

//     const sizeSelector1 = await screen.getByTestId('size-null').selected;
//     expect(sizeSelector1).toBeTruthy();

//     const quantitySelector1 = await screen.getByTestId('quant-null').selected;
//     expect(quantitySelector1).toBeTruthy();

//     fireEvent.change(screen.getByTestId('size-selector'), { target: { value: 1394769 } });

//     const sizeSelector2 = await screen.getByTestId('size-XS').selected;
//     expect(sizeSelector2).toBeTruthy();

//     const quantitySelector2 = await screen.getByTestId('quant-1').selected;
//     expect(quantitySelector2).toBeTruthy();

//     fireEvent.change(screen.getByTestId('quantity-selector'), { target: { value: 2 } });

//     const quantitySelector3 = await screen.getByTestId('quant-2').selected;
//     expect(quantitySelector3).toBeTruthy();
//   });

  it('handles photo changes', async () => {
    await act(async () => render(<Overview currentProduct={dummyData.product} rating={3.75} totalReviews={1000}/>));

//     const defaultPhoto1 = await screen.getByTestId('default-photo-0');
//     expect(defaultPhoto1).toBeTruthy();

//     fireEvent.click(screen.getByTestId('thumbnail-1'));

//     const defaultPhoto2 = await screen.getByTestId('default-photo-1');
//     expect(defaultPhoto2).toBeTruthy();

//     fireEvent.click(screen.getByTestId('thumbnail-2'));

//     const defaultPhoto3 = await screen.getByTestId('default-photo-2');
//     expect(defaultPhoto3).toBeTruthy();

//     fireEvent.click(screen.getByTestId('default-left-arrow'));

//     const defaultPhoto4 = await screen.getByTestId('default-photo-1');
//     expect(defaultPhoto4).toBeTruthy();

//     fireEvent.click(screen.getByTestId('default-right-arrow'));

//     const defaultPhoto5 = await screen.getByTestId('default-photo-2');
//     expect(defaultPhoto5).toBeTruthy();
//   });

  it('handles expanded view', async () => {
    await act(async () => render(<Overview currentProduct={dummyData.product} rating={3.75} totalReviews={1000}/>));

//     const expandedView1 = await screen.queryByTestId('expanded-view');
//     expect(expandedView1).toBeFalsy();

//     fireEvent.click(screen.getByTestId('default-photo-0'));

//     const expandedView2 = await screen.queryByTestId('expanded-view');
//     expect(expandedView2).toBeTruthy();

//     const expandedPhoto1 = await screen.getByTestId('expanded-photo-0');
//     expect(expandedPhoto1).toBeTruthy();

//     fireEvent.click(screen.getByTestId('expanded-right-arrow'));

//     const expandedPhoto2 = await screen.getByTestId('expanded-photo-1');
//     expect(expandedPhoto2).toBeTruthy();

//     fireEvent.click(screen.getByTestId('expanded-left-arrow'));

//     const expandedPhoto3 = await screen.getByTestId('expanded-photo-0');
//     expect(expandedPhoto3).toBeTruthy();

//     fireEvent.click(screen.getByTestId('icon-2'));

//     const expandedPhoto4 = await screen.getByTestId('expanded-photo-2');
//     expect(expandedPhoto4).toBeTruthy();
//   });

  it('handles zoomed view', async () => {
    await act(async () => render(<Overview currentProduct={dummyData.product} rating={3.75} totalReviews={1000}/>));

//     const zoomedView1 = await screen.queryByTestId('zoomed-photo-0');
//     expect(zoomedView1).toBeFalsy();

//     fireEvent.click(screen.getByTestId('default-photo-0'));

//     const zoomedView2 = await screen.queryByTestId('zoomed-photo-0');
//     expect(zoomedView2).toBeFalsy();

//     fireEvent.click(screen.getByTestId('expanded-photo-0'));

//     const zoomedView3 = await screen.queryByTestId('zoomed-photo-0');
//     expect(zoomedView3).toBeTruthy();

//     const icons = await screen.queryByTestId('expanded-view-icons');
//     expect(icons).toBeFalsy();

//     const leftArrow = await screen.queryByTestId('expanded-left-arrow');
//     expect(leftArrow).toBeFalsy();

//     const rightArrow = await screen.queryByTestId('expanded-right-arrow');
//     expect(rightArrow).toBeFalsy();
//   });
// });
