import React, { useState, useEffect } from 'react';
import IndividualAnswer from './IndividualAnswer.jsx';
import axios from 'axios';

// List of answers - Integrate into IndividualQuestion.jsx
const AnswersList = ({ questionId, handleHelpful, handleReport }) => {
  // console.log('answersList: ', question_id);
  const [totalAnswerList, setTotalAnswerList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [loadAnswerButton, setLoadAnswerButton] = useState(true);
  const [answerCount, setAnswerCount] = useState(2);

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

  const handleLoadMoreAnswers = () => {
    setAnswerCount(prev => prev + 2);
    let container = [];
    for (let i = 0; i < totalAnswerList.length; i++) {
      if (i === answerCount) {
        break;
      }
      container.push(totalAnswerList[i]);
    }
    setAnswerList(container);
    if (totalAnswerList.length <= answerCount) {
      setAnswerList(totalAnswerList);
      setLoadAnswerButton(false);
    }
  };

  const handleAnswerHelpful = (item) => {
    const userLookup = JSON.parse(localStorage.getItem(`${document.cookie}`));

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
    axios.put(`/qa/answers/${item.answer_id}/report`)
      .then(() => item)
      .catch(err => console.log(err));
  };

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
        setAnswerCount(prev => prev + 2);
        setTotalAnswerList(data);
        setAnswerList(container);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <div className="answers-list">
        {answerData()}
      </div>

      {loadAnswerButton && <button onClick={() => handleLoadMoreAnswers()}>LOAD MORE ANSWERS</button>}
    </div>
  );
};

export default AnswersList;