import React from 'react';
import AnswersList from './AnswersList.jsx';
import { formatDistanceToNow, parseISO } from 'date-fns';

// Individual question - Integrate into QuestionsList.jsx
const IndividualQuestion = ({ question, handleHelpful, handleReport }) => {
  // console.log('Individual question: ', question);

  // destructure question object
  const { asker_name, question_body, question_helpfulness, question_date, question_id } = question;

  return (
    <div className="individual-question">
      <p className="question-body">
        <b>Q:</b> {question_body}
      </p>

      <p className="question-helpfulness">
        Helpful? <span onClick={() => handleHelpful(question)}>Yes</span> ({question_helpfulness}) <button className="question-report" onClick={(e) => handleReport(e, question)}>Report</button>
      </p>

      <p>
        {asker_name}, {formatDistanceToNow(parseISO(question_date))}
      </p>

      <div>
        {/* Answers has a list of its own */}
        <b>A:</b> {<AnswersList question={question_body} question_id={question_id} handleHelpful={handleHelpful} handleReport={handleReport} />}
      </div>
    </div >
  );
};

export default IndividualQuestion;