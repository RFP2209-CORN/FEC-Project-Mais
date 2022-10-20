import React from 'react';

// NOT NEEDED?

// Question List - Integrate into Q&A Overview
const QuestionList = ({ loadQuestionButton, renderQuestionsList, handleHelpful, handleReport, handleLoadQuestion}) => {
  // console.log('questionsData: ', questionsData);

  return (
    <div className="questions-list">
      {renderQuestionsList()}
      {loadQuestionButton && <button onClick={() => handleLoadQuestion()} >More Answered Questions</button>}
    </div>
  );
};

export default QuestionList;