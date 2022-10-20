import React, { useState, useEffect } from 'react';
import SearchQA from './SearchQA.jsx';
import AskAQuestionModal from './AskAQuestionModal.jsx';
// import QuestionsList from './QuestionsList.jsx';
import IndividualQuestion from './IndividualQuestion.jsx';
import axios from 'axios';

// Will need to change out once actual product_id is passed down from App
const product_id = 40349;
// 40355

const QuestionsAndAnswers = () => {
  const [currentProduct, setCurrentProduct] = useState('');
  const [allQuestionsData, setAllQuestionsData] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [loadQuestionButton, setLoadQuestionButton] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [questionCount, setQuestionCount] = useState(2);
  // const [cookie, setCookie] = useState('');

  // TODO: Handle helpfulness PUT Request - update helpfulness count;
  const handleHelpful = (item) => {
    // console.log('Helpful clicked', item);
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
    e.target.innerText = 'Reported';
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
    setQuestionsData(container);
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
    setQuestionsData(container);

    if (allQuestionsData.length <= questionCount) {
      setLoadQuestionButton(false);
      setQuestionsData(allQuestionsData);
    }
  };

  const renderQuestionsList = () => {
    if (questionsData.length === 0) {
      return <em>No question found. Try again...</em>;
    }
    if (questionsData.length !== 0) {
      return questionsData.map(item => {
        return <IndividualQuestion question={item} key={item.question_id} handleHelpful={handleHelpful} handleReport={handleReport} />;
      });
    }
  };

  useEffect(() => {
    axios.get(`/qa/questions/${product_id}`)
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
        setQuestionsData(container);
      })
      // .then(() => setCookie(document.cookie))
      .catch(err => console.log(err));
  }, []);

  // get product ID - will change in future
  useEffect(() => {
    axios.get(`/products/${product_id}`)
      .then(result => {
        setCurrentProduct(result.data.name);
      })
      .catch(err => console.log(err));
  }, []);
  console.log(allQuestionsData);

  return (
    <>
      <div>
        <SearchQA handleSearch={handleSearch} />
      </div>

      {/* Provides all the details of questions and their answers */}
      {/* <QuestionsList
          renderQuestionsList={renderQuestionsList}
          handleHelpful={handleHelpful}
          handleReport={handleReport}
          loadQuestionButton={loadQuestionButton}
          handleLoadQuestion={handleLoadMoreQuestion}
        /> */}

      <div className="questions-list">
        {renderQuestionsList()}
        {loadQuestionButton && <button onClick={() => handleLoadMoreQuestion()} >MORE ANSWERED QUESTIONS</button>}
      </div>

      <br />

      <span>
        <button onClick={() => setIsOpen(true)}>Ask a question</button>

        <AskAQuestionModal open={isOpen} onClose={() => setIsOpen(false)} product={currentProduct} />
      </span>
    </>
  );
};

export default QuestionsAndAnswers;