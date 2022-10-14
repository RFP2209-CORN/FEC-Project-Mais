import React from 'react';
import IndividualQuestion from './IndividualQuestion.jsx';

// Question List - Integrate into Q&A Overview
const QuestionList = ({ questionsData }) => {
  // console.log(questionsData)

  return (
    <div>
      {/* Generate individual question item per product */}
      {questionsData.map(item => {
        return <IndividualQuestion question={item} key={item.question_id} />;
      })}
    </div>
  );
};

export default QuestionList;