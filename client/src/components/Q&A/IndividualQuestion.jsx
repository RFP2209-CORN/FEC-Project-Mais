import React from 'react';
import AnswersList from './AnswersList.jsx';
import { formatDistanceToNow, parseISO } from 'date-fns';

// Individual question - Integrate into QuestionsList.jsx
const IndividualQuestion = ({ question }) => {
  // console.log(question)

  // destructure question object
  const { asker_name, question_body, question_helpfulness, answers, question_date } = question

  return (
    <div>
      Q: {question_body} ---- Helpful? {question_helpfulness} <br />
      {asker_name}, {formatDistanceToNow(parseISO(question_date))} <br />
      {/* Answers has a list of its own */}
      A: {<AnswersList answersList={answers} />}
    </div >
  )
};

export default IndividualQuestion;