import React, { useState, useEffect } from 'react';
// import SearchQA from './SearchQA.jsx';
// import AddAnswer from './AddAnswer.jsx';
// import AskAQuestion from './AskAQuestion.jsx';
import QuestionsList from './QuestionsList.jsx';
import axios from 'axios';

const QuestionsAndAnswers = () => {
  const [questionsData, setQuestionsData] = useState([])
  // const [answerList, setAnswerList] = useState([])

  useEffect(() => {
    // HARDCODE axios GET data for testing. 40349 has good data to use
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=40349', {
      headers: { Authorization: process.env.GITHUB_API_KEY },
    })
      .then(result => setQuestionsData(result.data.results))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      {/* <SearchQA /> */}

      <div>
        {/* Provides all the details of questions and their answers */}
        <QuestionsList questionsData={questionsData} />
      </div>
    </div>
  )
};

export default QuestionsAndAnswers;