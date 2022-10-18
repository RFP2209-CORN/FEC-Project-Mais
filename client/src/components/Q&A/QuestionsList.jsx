import React from 'react';
import IndividualQuestion from './IndividualQuestion.jsx';

// Question List - Integrate into Q&A Overview
const QuestionList = ({ questionsData, handleHelpful, handleReport }) => {
  // console.log('questionsData: ', questionsData);

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
      {renderQuestionsList()}
    </div>
  );
};

export default QuestionList;