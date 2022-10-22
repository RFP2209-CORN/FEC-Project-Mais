import React, { useState, useEffect } from 'react';
import SearchQA from './SearchQA.jsx';
import AskAQuestionModal from './AskAQuestionModal.jsx';
// import QuestionsList from './QuestionsList.jsx';
import IndividualQuestion from './IndividualQuestion.jsx';
import AnswersList from './AnswersList.jsx';
import { validate } from 'react-email-validator';
import axios from 'axios';

// 40355

const QuestionsAndAnswers = ({ productId }) => {
  const [currentProduct, setCurrentProduct] = useState([]);
  const [allQuestionsData, setAllQuestionsData] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [loadQuestionButton, setLoadQuestionButton] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [questionCount, setQuestionCount] = useState(2);
  // const [cookie, setCookie] = useState('');

  const handleQuestionHelpful = (item) => {
    axios.put(`/qa/questions/${item.question_id}/helpful`)
      .then(() => {
        for (let i = 0; i < questionsList.length; i++) {
          if (item.question_id === questionsList[i].question_id) {
            setQuestionsList((data) => {
              let newData = data.slice();
              newData[i].question_helpfulness += 1;
              return newData;
            });
          }
        }
      });
  };

  // TODO: Handle report PUT request - does not delete answer, just not return answer for GET request.
  const handleQuestionReport = (item) => {
    axios.put(`/qa/questions/${item.question_id}/report`)
      .then(() => item)
      .catch(err => console.log(err));
  };


  const handleSearch = (value) => {
    let container = [];
    if (value.length <= 2) {
      container = allQuestionsData;
    } else if (value.length > 2) {
      for (let i = 0; i < allQuestionsData.length; i++) {
        if (allQuestionsData[i].question_body.toLowerCase().includes(value)) {
          container.push(allQuestionsData[i]);
        }
      }
    }
    setQuestionsList(container);
  };

  const handleLoadMoreQuestion = () => {
    setQuestionCount(prev => prev + 2);

    let container = [];
    for (let i = 0; i < allQuestionsData.length; i++) {
      if (i === questionCount) {
        break;
      }
      container.push(allQuestionsData[i]);
    }
    setQuestionsList(container);

    if (allQuestionsData.length <= questionCount) {
      setLoadQuestionButton(false);
      setQuestionsList(allQuestionsData);
    }
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    const questionData = {
      body: e.target.question.value,
      name: e.target.name.value,
      email: e.target.email.value,
      'product_id': productId
    };

    console.log(questionData);
    if (!validate(questionData.email)) {
      alert('The email address provided is not in correct email format.');
    }

    axios.post('/qa/questions', questionData)
      .then(() => setIsOpen(false))
      .catch(err => console.log(err));
  };

  const renderQuestionsList = (data) => {
    if (data.length === 0) {
      return <em>No question found. Try again...</em>;
    }
    if (data.length !== 0) {
      return data.map(item => {
        return <IndividualQuestion question={item} key={item.question_id} handleHelpful={handleQuestionHelpful} handleReport={handleQuestionReport} product={currentProduct} />;
      });
    }
  };


  useEffect(() => {
    axios.get(`/qa/questions/${productId}`)
      .then(result => {
        const data = result.data.results;
        if (data.length < 3) {
          setLoadQuestionButton(false);
        }
        let container = [];
        for (let i = 0; i < data.length; i++) {
          if (i === questionCount) { break; }
          container.push(data[i]);
        }
        setQuestionCount(prev => prev + 2);
        setAllQuestionsData(data);
        setQuestionsList(container);
      })
      .then(() => {
        localStorage.setItem(`${document.cookie}`, document.cookie);
      })
      .catch(err => console.log(err));

    axios.get(`/products/${productId}`)
      .then(result => {
        setCurrentProduct(result.data.name);
      })
      .catch(err => console.log(err));
  }, []);


  console.log('QA: data = ', allQuestionsData);


  return (
    <>
      <div>
        <SearchQA handleSearch={handleSearch} />
      </div>

      <div className="questions-list">
        {renderQuestionsList(questionsList)}
      </div>
      {loadQuestionButton && <button onClick={() => handleLoadMoreQuestion()} >MORE ANSWERED QUESTIONS</button>}

      <br />

      <span>
        <button onClick={() => setIsOpen(true)}>Ask a question</button>

        <AskAQuestionModal open={isOpen} onClose={() => setIsOpen(false)} product={currentProduct} submitQuestion={handleSubmitQuestion} />
      </span>
    </>
  );
};

export default QuestionsAndAnswers;