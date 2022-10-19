import React, { useState, useEffect } from 'react';
import IndividualAnswer from './IndividualAnswer.jsx';
import axios from 'axios';

// List of answers - Integrate into IndividualQuestion.jsx
const AnswersList = ({ question_id, handleHelpful, handleReport }) => {
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
        return <IndividualAnswer answer={answer} key={answer.answer_id} handleHelpful={handleHelpful} handleReport={handleReport} />;
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

  useEffect(() => {
    axios.get(`/qa/questions/${question_id}/answers`)
      .then(result => {
        const data = result.data.results;
        console.log(data);
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
    <div className="answers-list">
      {answerData()}
      {loadAnswerButton && <button onClick={() => handleLoadMoreAnswers()}>LOAD MORE ANSWERS</button>}
    </div>
  );
};

export default AnswersList;