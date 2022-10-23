import React, { useState, useEffect } from 'react';
import IndividualAnswer from './IndividualAnswer.jsx';
import axios from 'axios';

const AnswersList = ({ questionId, handleHelpful, handleReport }) => {
  // console.log('answersList: ', question_id);
  const [totalAnswerList, setTotalAnswerList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [loadAnswerButton, setLoadAnswerButton] = useState(true);
  const [collapseButton, setCollapseButton] = useState(false);
  const [answerCount, setAnswerCount] = useState(2);

  // Render List of Answers or Nothing.
  const answerData = () => {
    if (!totalAnswerList.length) {
      return <em>There are no answers yet.</em>;
    }
    if (totalAnswerList.length) {
      return answerList.map(answer => {
        return <IndividualAnswer answer={answer} key={answer.answer_id} handleHelpful={handleAnswerHelpful} handleReport={handleAnswerReport} />;
      });
    }
  };

  // Handle LoadMoreAnswers/Collapse Button
  const handleAnswerLength = (e) => {
    if (e.target.innerText === 'LOAD MORE ANSWERS') {
      setAnswerCount(prev => prev + 2);
    } else if (e.target.innerText === 'Collapse Answers') {
      setAnswerCount(2);
    }
  };

  // Async Rendering in conjunction with handleAnswerLength
  useEffect(() => {
    if (totalAnswerList.length <= answerCount) {
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

  // increment Answer helpful by 1 per user
  const handleAnswerHelpful = (item) => {
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

  // Mark Answer as Reported
  const handleAnswerReport = (item) => {
    axios.put(`/qa/answers/${item.answer_id}/report`)
      .then(() => item)
      .catch(err => console.log(err));
  };

  // Initial Answers Data Retrieval
  useEffect(() => {
    axios.get(`/qa/questions/${questionId}/answers`)
      .then(result => {
        const data = result.data.results;
        if (data.length < 3) {
          setLoadAnswerButton(false);
        }
        let container = [];
        for (let i = 0; i < data.length; i++) {
          if (i === answerCount) {
            break;
          }
          container.push(data[i]);
        }
        setTotalAnswerList(data);
        setAnswerList(container);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="answers-container">
      <div className="answers-list">
        {answerData()}
      </div>

      <div className="load-answers">
        {loadAnswerButton && <button onClick={(e) => handleAnswerLength(e)}>LOAD MORE ANSWERS</button>}
        {collapseButton && answerList.length > 0 && <button onClick={(e) => handleAnswerLength(e)}>Collapse Answers</button>}
      </div>
    </div>
  );
};

export default AnswersList;