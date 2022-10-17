import React from 'react';
import IndividualQuestion from './IndividualQuestion.jsx';

// Question List - Integrate into Q&A Overview
const QuestionList = ({ questionsData, handleHelpful, handleReport }) => {
  // console.log(questionsData)

  return (
    <div className="questions-list">
      {/* Generate individual question item per product */}
      {questionsData.map(item => {
        return <IndividualQuestion question={item} key={item.question_id} handleHelpful={handleHelpful} handleReport={handleReport} />;
      })}
    </div>
  );
};

export default QuestionList;