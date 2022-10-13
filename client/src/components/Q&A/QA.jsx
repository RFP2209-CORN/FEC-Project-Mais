import React, { useState, useEffect } from 'react';
import SearchQA from './SearchQA.jsx';
import AddAnswer from './AddAnswer.jsx';
import AskAQuestion from './AskAQuestion.jsx';
import questionList from './QuestionList.jsx';

const QuestionsAndAnswers = () => {
  const [questionList, setQuestionList] = useState([])
  const [answerList, setAnswerList] = useState([])


  return (
    <div>
      <SearchQA />

      {/* <questionList /> */}
    </div>
  )
}

export default QuestionsAndAnswers;