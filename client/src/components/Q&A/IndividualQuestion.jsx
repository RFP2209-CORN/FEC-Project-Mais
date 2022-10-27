/* eslint-disable camelcase */
import React, { useState } from 'react';
import AnswersList from './AnswersList.jsx';
import AddAnswerModal from './AddAnswerModal.jsx';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import { validate } from 'react-email-validator';

const IndividualQuestion = ({ question, handleHelpful, handleReport, product, photoWidget, images, setImages }) => {
  // console.log('Individual question: ', question);
  const [isOpen, setIsOpen] = useState(false);
  const [report, setReport] = useState(false);
  const [answerData, setAnswerData] = useState();
  const { asker_name, question_body, question_helpfulness, question_date, question_id } = question;

  // Add new Answer w/ validation
  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    const answerInfo = {
      body: e.target.answer.value,
      name: e.target.name.value,
      email: e.target.email.value,
      photos: images
    };
    if (!validate(answerInfo.email)) {
      alert('The email address provided is not in correct email format.');
    }
    if (answerInfo.photos.length > 5) {
      alert('Only max of 5 photos allowed');
    }
    axios.post(`/qa/questions/${question_id}/answers`, answerInfo)
      .then(() => setIsOpen(false))
      .catch(err => console.log(err));

    setAnswerData(answerInfo);
  };

  return (
    <div className="individual-question">
      <p className="question">
        <b>Q:</b>
      </p>

      <p className="question-body">
        {question_body}
      </p>

      <p className="add-answer">
        <button onClick={() => setIsOpen(true)} >Add Answer</button>
        <AddAnswerModal open={isOpen} onClose={() => setIsOpen(false)} question={question_body} submitAnswer={handleSubmitAnswer} product={product} photoWidget={photoWidget} images={images} setImages={setImages} />
      </p>

      <p className="question-info">
        {/* COMMENT OUT FOR TESTING */}
        by {asker_name}, {format(parseISO(question_date), 'MMMM dd, yyyy')}

        {/* COMMENT IN FOR TESTING */}
        {/* by {asker_name}, */}
      </p>

      <p className="question-helpfulness">
        Helpful? <em><span className="helpful" onClick={() => { handleHelpful(question); }}>Yes</span> ({question_helpfulness})</em>
      </p>

      <p className="question-report">
        {!report && <button
          onClick={() => {
            setReport(true);
            handleReport(question);
          }}>Report</button>}
        {report && <span>Reported</span>}
      </p>

      <div className="answers">
        <b>A:</b>
      </div>

      <div className="render-answers">
        <AnswersList questionId={question_id} answerInfo={answerData} />
      </div>
    </div >
  );
};

export default IndividualQuestion;