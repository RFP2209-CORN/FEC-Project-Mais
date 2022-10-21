import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import axios from 'axios';
import IndividualAnswer from '../client/src/components/Q&A/IndividualAnswer.jsx';
import QuestionsAndAnswers from '../client/src/components/Q&A/QA.jsx';

// jest.mock('axios', () => jest.fn());


// let url = '';
// let body = {};

// jest.mock('axios', () => ({
//   get: jest.fn((_url, _body) => {
//     return new Promise((resolve) => {
//       url = _url;
//       body = _body;
//       resolve(true);
//     });
//   })
// }));


// it('ProductInfo renders and contains an id of product-info', () => {
//   let result;




//   const widget = render(<QuestionsAndAnswers />);
//   expect(widget.getByTestId('answer-modal-inputs')).toBeTruthy();
// });



/*
// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");

// ...

test("good response", () => {
  axios.get.mockImplementation(() => Promise.resolve({ data: {...} }));
  // ...
});

test("bad response", () => {
  axios.get.mockImplementation(() => Promise.reject({ ... }));
  // ...
});


//
axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: {...} }));

//
axios.get.mockImplementation((url) => {
    if (url === 'www.example.com') {
        return Promise.resolve({ data: {...} });
    } else {
        //...
    }
});
*/

it('ProductInfo renders and contains an id of product-info', () => {
  const answer = {
    'answer_id': 5985372,
    body: '2345',
    'answerer_name': 'dfdf',
    date: '2022-05-23T00:00:00.000Z',
    photos: [],
    helpfulness: 5
  };

  const widget = render(<IndividualAnswer answer={answer} />);
  expect(widget.getByTestId('answer-modal-inputs')).toBeTruthy();
});