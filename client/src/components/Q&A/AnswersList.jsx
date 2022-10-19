import React, { useState, useEffect } from 'react';
import IndividualAnswer from './IndividualAnswer.jsx';
import AddAnswerModal from './AddAnswerModal.jsx';
import axios from 'axios';

// List of answers - Integrate into IndividualQuestion.jsx
const AnswersList = ({ question, question_id, handleHelpful, handleReport }) => {
  // console.log('answersList: ', question_id);
  const [totalAnswerList, setTotalAnswerList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // TODO: handle load more answers
  const handleLoadMoreAnswers = () => {
    console.log('load more answer button clicked');
  };

  const answerData = () => {
    if (!totalAnswerList.length) {
      return <em>There are no answers yet.</em>;
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
        const data = result.data.results;
        setTotalAnswerList(data);
        // temporary set for answer list;
        setAnswerList([data[0], data[1]]);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="answers-list">
      <p>
        {answerData()}
      </p>

      <p>

        {/* shows load more answers button if answers are more than 2 */}
        {totalAnswerList.length > 2 && <button onClick={() => handleLoadMoreAnswers()}>Load more answers</button>}
      </p>

      <span>
        <button className="add-answer" onClick={() => setIsOpen(true)}>Add Answer</button>

        <AddAnswerModal open={isOpen} onClose={() => setIsOpen(false)} question={question}/>
      </span>
    </div>
  );
};

export default AnswersList;