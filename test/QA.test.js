import React from 'react';
import axios from 'axios';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import dummyData from './dummyData.js';

import QuestionsAndAnswers from '../client/src/components/Q&A/QA.jsx';
import IndividualQuestion from '../client/src/components/Q&A/IndividualQuestion.jsx';
// import AnswersList from '../client/src/components/Q&A/AnswersList.jsx';
// import IndividualAnswer from '../client/src/components/Q&A/IndividualAnswer.jsx';
// import SearchQA from '../client/src/components/Q&A/SearchQA.jsx';
// import AskAQuestionModal from '../client/src/components/Q&A/AskAQuestionModal.jsx';
import AddAnswerModal from '../client/src/components/Q&A/AddAnswerModal.jsx';
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
    }));
  });

  it('Questions and Answers contain title and add a question', async () => {
    // Render the widget, use act to handle any states being re-rendered
    await act(async () => render(<QuestionsAndAnswers />));

    const sectionTitleQA = await screen.getByText('Questions & Answers');
    expect(sectionTitleQA).toBeTruthy();

    const addQuestions = await screen.getByText('ASK A QUESTION +');
    expect(addQuestions).toBeTruthy();
  });

  // const moreQuestions = screen.getByText('MORE ANSWERED QUESTIONS');
  // expect(moreQuestions).toBeTruthy();
});

// describe('Add Answer Modal', () => {
//   const submitAnswer = (e) => {

//   }


//   it('add answer modal', async () => {
//     await act(async () => render(<AddAnswerModal submitAnswer={submitAnswer}/>));




//     const addQuestions = await screen.getByText('ASK A QUESTION +');
//     expect(addQuestions).toBeTruthy();

//   })

// });




// describe('Individual Question', () => {
//   beforeEach(() => {
//     axios.get
//     .mockImplementationOnce(() => Promise.resolve({
//       data: dummyData.answerList
//     }));
//   });

//   it('Individual question contains a body, name, helpfulness', async () => {
//     const question = {
//       'question_id': 643350,
//       'question_body': 'IS CHAINSAW MAN A1? ',
//       'question_date': '2022-10-13T00:00:00.000Z',
//       'asker_name': 'UNKOWN',
//       'question_helpfulness': 55
//     }

//   await act(async () => render(<IndividualQuestion question={question}/>));

//   expect(question['question_body']).toBe('IS CHAINSAW MAN A1? ');
//   expect(question['asker_name']).toBe('UNKOWN');
//   expect(question['question_helpfulness']).toBe(55);

//   });
// });

// test('test', () => {
//   expect(true).toBe(true);
// });
