import React, { useState, useEffect } from 'react';
import IndividualAnswer from './IndividualAnswer.jsx';
import axios from 'axios';

// List of answers - Integrate into IndividualQuestion.jsx
const AnswersList = ({ question_id, handleHelpful, handleReport }) => {
  // console.log('answersList: ', question_id);
  const [totalAnswerList, setTotalAnswerList] = useState([]);
  const [answerList, setAnswerList] = useState([]);

  // TODO: handle load more answers, need to be sorted first
  const handleLoadMoreAnswers = () => {
    console.log('load more answer button clicked');

  };

  const answerData = () => {
    if (!totalAnswerList.length) {
      return 'There are no answers yet.';
    }
    if (totalAnswerList.length <= 2) {
      return totalAnswerList.map(answer => {
        return <IndividualAnswer answer={answer} key={answer.answer_id} handleHelpful={handleHelpful} handleReport={handleReport} />;
      });
    }
    // Need to sort list of answers according to seller first, then helpfulness
    if (totalAnswerList.length > 2) {
      return answerList.map(answer => {
        return <IndividualAnswer answer={answer} key={answer.answer_id} handleHelpful={handleHelpful} handleReport={handleReport} />;
      });
    }
  };

  useEffect(() => {
    axios.get(`/qa/questions/${question_id}/answers`)
      .then(result => {
        // need to Sort Before rendering data
        setTotalAnswerList(result.data.results);
        // temporary set for answer list;
        setAnswerList([result.data.results[0], result.data.results[1]]);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="answers-list">
      {answerData()}

      <br />

      {/* shows load more answers button if answers are more than 2 */}
      {totalAnswerList.length > 2 && <button onClick={() => handleLoadMoreAnswers()}>Load more answers</button>}

      <br />

      <button className="add-answer">Add Answer</button>
    </div>
  );
};

export default AnswersList;