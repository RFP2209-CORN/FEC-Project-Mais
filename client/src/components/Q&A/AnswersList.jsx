import React, { useState, useEffect } from 'react';
import IndividualAnswer from './IndividualAnswer.jsx';
import axios from 'axios';

// List of answers - Integrate into IndividualQuestion.jsx
const AnswersList = ({ question_id }) => {
  // console.log('answersList: ', question_id);
  const [answerList, setAnswerList] = useState([]);

  const answerData = () => {
    if (!answerList.length) {
      return 'There are no answers yet';
    } else {
      return answerList.map(answer => {
        return <IndividualAnswer answer={answer} key={answer.answer_id} />;
      });
    }
  };

  useEffect(() => {
    axios.get(`/qa/questions/${question_id}/answers`)
      .then(result => setAnswerList(result.data.results))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {answerData()}
    </div>
  );
};

export default AnswersList;