import React, { useState, useEffect } from 'react';
import SearchQA from './SearchQA.jsx';
// import AddAnswer from './AddAnswer.jsx';
// import AskAQuestion from './AskAQuestion.jsx';
import QuestionsList from './QuestionsList.jsx';
import axios from 'axios';

const QuestionsAndAnswers = () => {
  const [allQestionsData, setAllQuestionsData] = useState([]);
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

  const handleSearch = (value) => {
    let container = [];
    if (value.length <= 2) {
      container = allQestionsData;
    } else if (value.length > 2) {
      for (let i = 0; i < allQestionsData.length; i++) {
        if (allQestionsData[i].question_body.toLowerCase().includes(value)) {
          container.push(allQestionsData[i]);
        }
      }
    }
    setQuestionsData(container);
  };

  const renderQuestionsList = () => {
    if (questionsData.length === 0) {
      return 'No question found. Try again...';
    } else if (questionsData.length !== 0) {
      return <QuestionsList questionsData={questionsData} handleHelpful={handleHelpful} handleReport={handleReport} />;
    }
  };

  useEffect(() => {
    axios.get(`/qa/questions/${40349}`)
      .then(result => {
        setAllQuestionsData(result.data.results);
        setQuestionsData(result.data.results);
        // renderQuestionsList();
      })
      .then(() => setCookie(document.cookie))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <SearchQA handleSearch={handleSearch}/>

      <div>
        {/* Provides all the details of questions and their answers */}
        {renderQuestionsList()}
      </div>

      <div>
        {/* <AskAQuestion /> */}
      </div>

    </div>
  );
};

export default QuestionsAndAnswers;