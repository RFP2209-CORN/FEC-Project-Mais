import React, { useState, useEffect } from 'react';
import SearchQA from './SearchQA.jsx';
import AskAQuestionModal from './AskAQuestionModal.jsx';
import IndividualQuestion from './IndividualQuestion.jsx';
import AnswersList from './AnswersList.jsx';
import { validate } from 'react-email-validator';
import axios from 'axios';

const QuestionsAndAnswers = ({ productId }) => {
  const [currentProduct, setCurrentProduct] = useState([]);
  const [allQuestionsData, setAllQuestionsData] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [loadQuestionButton, setLoadQuestionButton] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [questionCount, setQuestionCount] = useState(2);

  const handleQuestionHelpful = (item) => {
    const userLookup = JSON.parse(localStorage.getItem(`${document.cookie}`));

    if (!userLookup[`QID${item.question_id}`]) {
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
          userLookup[`QID${item.question_id}`] = true;
          localStorage.setItem(`${document.cookie}`, JSON.stringify(userLookup));
        })
        .catch(err => console.log(err));
    }
  };

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
        if (JSON.parse(localStorage[document.cookie]).cookie !== document.cookie) {
          localStorage.setItem(`${document.cookie}`, JSON.stringify({ cookie: document.cookie }));
        }
      })
      .catch(err => console.log(err));

    axios.get(`/products/${productId}`)
      .then(result => {
        setCurrentProduct(result.data.name);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="qa-container">
      <div className="search-question">
        <SearchQA handleSearch={handleSearch} />
      </div>

      <div className="questions-list">
        {renderQuestionsList(questionsList)}
      </div>
      {loadQuestionButton && <button onClick={() => handleLoadMoreQuestion()} >MORE ANSWERED QUESTIONS</button>} <br />

      <br />

      <div className="ask-question-modal">
        <button onClick={() => setIsOpen(true)}>ASK A QUESTION +</button>
        <AskAQuestionModal open={isOpen} onClose={() => setIsOpen(false)} product={currentProduct} submitQuestion={handleSubmitQuestion} />
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;