import React from 'react';
import AnswersList from './AnswersList.jsx';
import { formatDistanceToNow, parseISO } from 'date-fns';

// Individual question - Integrate into QuestionsList.jsx
const IndividualQuestion = ({ question }) => {
  // console.log('Individual question: ', question);

  // destructure question object
  const { asker_name, question_body, question_helpfulness, question_date, question_id } = question;

  return (
    <div className="individual-question">
      <br/>
      <b>Q:</b> {question_body} ---- Helpful? {question_helpfulness} <br />
      {asker_name}, {formatDistanceToNow(parseISO(question_date))} <br />
      <br/>
      {/* Answers has a list of its own */}
      <b>A:</b> {<AnswersList question_id={question_id} />}
    </div >
  );
};

export default IndividualQuestion;