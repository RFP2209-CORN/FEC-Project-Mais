import React, { useState, useEffect } from 'react';
// import SearchQA from './SearchQA.jsx';
// import AddAnswer from './AddAnswer.jsx';
// import AskAQuestion from './AskAQuestion.jsx';
import QuestionsList from './QuestionsList.jsx';
import axios from 'axios';

const QuestionsAndAnswers = () => {
  const [questionsData, setQuestionsData] = useState([]);
  // const [answerList, setAnswerList] = useState([]);
  const [cookie, setCookie] = useState('');


  // TODO: Handle helpfulness PUT Request - update helpfulness count;
  const handleHelpful = (item) => {
    // console.log('Helpful clicked', item);
    // need special implementation to only inc by 1.
    // also need a PUT request to change helpfulness.
    if (item.question_helpfulness) {
      item.question_helpfulness++;
      console.log('after clicked question helpfulness: ', item.question_helpfulness);
    }
    if (item.helpfulness) {
      item.helpfulness++;
      console.log('after clicked answer helpfulness', item.helpfulness);
    }
  };

  // TODO: Handle report PUT request - does not delete answer, just not return answer for GET request.
  const handleReport = (e, item) => {
    console.log('Report clicked', e, item);
    // e.target.nodeName = 'P';
    e.target.innerText = 'Reported';
  };

  useEffect(() => {
    axios.get(`/qa/questions/${40349}`)
      .then(result => setQuestionsData(result.data.results))
      .then(() => setCookie(document.cookie))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {/* <SearchQA /> */}

      <div>
        {/* Provides all the details of questions and their answers */}
        <QuestionsList
          questionsData={questionsData}
          handleHelpful={handleHelpful}
          handleReport={handleReport} />
      </div>

      <div>
        {/* <AskAQuestion /> */}
      </div>

    </div>
  );
};

export default QuestionsAndAnswers;