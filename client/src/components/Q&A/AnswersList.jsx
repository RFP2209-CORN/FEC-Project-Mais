import React, { useState, useEffect } from 'react';
import IndividualAnswer from './IndividualAnswer.jsx';
import axios from 'axios';

const AnswersList = ({ questionId, handleHelpful, handleReport, answerInfo }) => {
  const [totalAnswerList, setTotalAnswerList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [loadAnswerButton, setLoadAnswerButton] = useState(true);
  const [collapseButton, setCollapseButton] = useState(false);
  const [answerCount, setAnswerCount] = useState(2);

  const showAnswersData = () => {
    if (!totalAnswerList.length) { return <em>There are no answers yet.</em>; }
    if (totalAnswerList.length) {
      return answerList.map(answer => {
        return <IndividualAnswer answer={answer} key={answer.answer_id} handleHelpful={handleAnswerHelpfulClick} handleReport={handleAnswerReport} />;
      });
    }
  };

  const handleLoadAnswersButton = (e) => {
    if (e.target.innerText === 'LOAD MORE ANSWERS') { setAnswerCount(prev => prev + 2); }
    if (e.target.innerText === 'COLLAPSE ANSWERS') { setAnswerCount(2); }
  };

  // Async Rendering in conjunction with handleLoadAnswersButton
  useEffect(() => {
    if (totalAnswerList.length < 3) {
      setLoadAnswerButton(false);
      setCollapseButton(false);
    } else if (totalAnswerList.length <= answerCount) {
      setLoadAnswerButton(false);
      setCollapseButton(true);
    } else {
      setLoadAnswerButton(true);
      setCollapseButton(false);
    }
    let container = [];
    for (let i = 0; i < totalAnswerList.length; i++) {
      if (i === answerCount) { break; }
      container.push(totalAnswerList[i]);
    }
    setAnswerList(container);
  }, [answerCount, totalAnswerList]);

  const handleAnswerHelpfulClick = (item) => {
    const userLookup = JSON.parse(localStorage.getItem([document.cookie]));
    if (!userLookup[`AID${item.answer_id}`]) {
      axios.put(`/qa/answers/${item.answer_id}/helpful`)
        .then(() => {
          for (let i = 0; i < answerList.length; i++) {
            if (item.answer_id === answerList[i].answer_id) {
              setAnswerList((data) => {
                let newData = data.slice();
                newData[i].helpfulness += 1;
                return newData;
              });
            }
          }
          userLookup[`AID${item.answer_id}`] = true;
          localStorage.setItem(`${document.cookie}`, JSON.stringify(userLookup));
        })
        .catch(err => console.log(err));
    }
  };

  const handleAnswerReport = (item) => {
    axios.put(`/qa/answers/${item.answer_id}/report`).catch(err => console.log(err));
  };

  useEffect(() => {
    axios.get(`/qa/questions/${questionId}/answers`)
      .then(result => {
        const data = result.data.results;
        let container = [];
        for (let i = 0; i < data.length; i++) {
          if (i === answerCount) { break; }
          container.push(data[i]);
        }
        setTotalAnswerList(data);
        setAnswerList(container);
      })
      .catch(err => console.log(err));
  }, [answerInfo]);

  return (
    <div className="answers-container">
      <div className="answers-list">{showAnswersData()}</div>
      <div className="load-answers">
        {loadAnswerButton && <button onClick={(e) => handleLoadAnswersButton(e)}>LOAD MORE ANSWERS</button>}
        {collapseButton && answerList.length > 0 && <button onClick={(e) => handleLoadAnswersButton(e)}>COLLAPSE ANSWERS</button>}
      </div>
    </div>
  );
};

export default AnswersList;