import React, { useState, useEffect } from 'react';
import SearchQA from './SearchQA.jsx';
import AskAQuestionModal from './AskAQuestionModal.jsx';
import QuestionsList from './QuestionsList.jsx';
import axios from 'axios';

// Will need to change out once actual product_id is passed down from App
const product_id = 40355;

const QuestionsAndAnswers = () => {

  const [currentProduct, setCurrentProduct ] = useState('');
  const [allQestionsData, setAllQuestionsData] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const [cookie, setCookie] = useState('');

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

  useEffect(() => {
    axios.get(`/qa/questions/${product_id}`)
      .then(result => {
        setAllQuestionsData(result.data.results);
        setQuestionsData(result.data.results);
      })
      // .then(() => setCookie(document.cookie))
      .catch(err => console.log(err));
  }, []);

  // get product ID - will change in future
  useEffect(() => {
    axios.get(`/products/${product_id}`)
      .then(result => {
        console.log(result.data);
        setCurrentProduct(result.data.name);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div>
        <SearchQA handleSearch={handleSearch} />
      </div>

      <div>
        {/* Provides all the details of questions and their answers */}
        <QuestionsList questionsData={questionsData} handleHelpful={handleHelpful} handleReport={handleReport} />
      </div>

      <br/>

      <span>
        <button onClick={() => setIsOpen(true)}>Ask a question</button>

        <AskAQuestionModal open={isOpen} onClose={() => setIsOpen(false)} product={currentProduct} />
      </span>
    </>
  );
};

export default QuestionsAndAnswers;