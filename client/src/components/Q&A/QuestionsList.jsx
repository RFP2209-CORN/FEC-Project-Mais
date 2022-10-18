import React from 'react';
import IndividualQuestion from './IndividualQuestion.jsx';

// Question List - Integrate into Q&A Overview
const QuestionList = ({ questionsData, handleHelpful, handleReport }) => {
  console.log('questionsData: ', questionsData);
  // Sort questionsData based on most helpful to least helpful
  questionsData.sort((a, b) => {
    return b.question_helpfulness - a.question_helpfulness;
  });

  const renderQuestionsList = () => {
    if (questionsData.length === 0) {
      return <em>No question found. Try again...</em>;
    } else if (questionsData.length !== 0) {
      return questionsData.map(item => {
        return <IndividualQuestion question={item} key={item.question_id} handleHelpful={handleHelpful} handleReport={handleReport} />;
      });
    }
  };

  return (
    <div className="questions-list">
      {/* Generate individual question item per product */}
      {renderQuestionsList()}
    </div>
  );
};

export default QuestionList;