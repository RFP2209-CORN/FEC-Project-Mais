import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import IndividualAnswer from '../client/src/components/Q&A/IndividualAnswer.jsx';


it('ProductInfo renders and contains an id of product-info', () => {
  const answer = {
    'answer_id': 5985372,
    body: '2345',
    'answerer_name': 'dfdf',
    date: '2022-05-23T00:00:00.000Z',
    photos: [],
    helpfulness: 5
  };

  const widget = render(<IndividualAnswer answer={answer}/>);
  expect(widget.getByTestId('answer-modal-inputs')).toBeTruthy();
});