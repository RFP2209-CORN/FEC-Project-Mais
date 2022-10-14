import React, { useState, useEffect } from 'react';
// import SearchQA from './SearchQA.jsx';
// import AddAnswer from './AddAnswer.jsx';
// import AskAQuestion from './AskAQuestion.jsx';
import QuestionsList from './QuestionsList.jsx';
import axios from 'axios';

const QuestionsAndAnswers = () => {
  const [questionsData, setQuestionsData] = useState([]);
  // const [answerList, setAnswerList] = useState([]);

  useEffect(() => {
    axios.get(`/qa/questions/${40349}`)
      .then(result => setQuestionsData(result.data.results))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {/* <SearchQA /> */}

      <div>
        {/* Provides all the details of questions and their answers */}
        <QuestionsList questionsData={questionsData} />
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;