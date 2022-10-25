import React from 'react';
import axios from 'axios';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import dummyData from './dummyData.js';

import QuestionsAndAnswers from '../client/src/components/Q&A/QA.jsx';
// import IndividualQuestion from '../client/src/components/Q&A/IndividualQuestion.jsx';
// import AnswersList from '../client/src/components/Q&A/AnswersList.jsx';
// import IndividualAnswer from '../client/src/components/Q&A/IndividualAnswer.jsx';
// import SearchQA from '../client/src/components/Q&A/SearchQA.jsx';
// import AskAQuestionModal from '../client/src/components/Q&A/AskAQuestionModal.jsx';
// import AddAnswerModal from '../client/src/components/Q&A/AddAnswerModal.jsx';
// import DisplayPhotoModal from '../client/src/components/Q&A/DisplayPhotoModal.jsx';

jest.mock('axios');


describe('Questions and Answer Overview', () => {

  beforeEach(() => {
    axios.get
    .mockImplementationOnce(() => Promise.resolve({
      data: dummyData.questionList
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: dummyData.product
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: dummyData.answerList
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: dummyData.answerList
    }))
  })

  it('ProductInfo renders and contains an id of product-info', async () => {
    // Render the widget, use act to handle any states being re-rendered
    await act(async () => render(<QuestionsAndAnswers />));


    // Check if
    const searchQuestion = await screen.getByText('Questions & Answers');
    expect(searchQuestion).toBeTruthy();

    // // Check if product name renders
    // const productName = await screen.getByText('Camo Onesie')
    // expect(productName).toBeTruthy();

    // // Check if product style renders
    // const productStyle = await screen.getByText("Forest Green & Black")
    // expect(productStyle).toBeTruthy();
  });
});


// it('ProductInfo renders and contains an id of product-info', () => {
//   const answer = {
//     'answer_id': 5985372,
//     body: '2345',
//     'answerer_name': 'dfdf',
//     date: '2022-05-23T00:00:00.000Z',
//     photos: [],
//     helpfulness: 5
//   };

//   const widget = render(<IndividualAnswer answer={answer} />);
//   expect(widget.getByTestId('answer-modal-inputs')).toBeTruthy();
// });