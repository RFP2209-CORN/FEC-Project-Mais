/* eslint-disable camelcase */
import React, { useState } from 'react';
import AnswersList from './AnswersList.jsx';
import AddAnswerModal from './AddAnswerModal.jsx';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import { validate } from 'react-email-validator';

// Testing Purpose ONLY ---- COMMENT OUT WHEN NOT TESTING //
// const cloudinary = {
//   createUploadWidget: () => { return null; }
// };

const IndividualQuestion = ({ question, handleHelpful, handleReport, product }) => {
  // console.log('Individual question: ', question);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [report, setReport] = useState(false);
  const { asker_name, question_body, question_helpfulness, question_date, question_id } = question;

  // Online Photo Upload Support
  const photoWidget = cloudinary.createUploadWidget(
    {
      cloudName: 'dqk77sezi',
      uploadPreset: 'FEC-add-photo'
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('done! Here is the image info: ', result.info);
        setImages([...images, result.info.url]);
      }
      if (error) { console.log(error); }
    }
  );

  // Add new Answer w/ validation
  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    const answerData = {
      body: e.target.answer.value,
      name: e.target.name.value,
      email: e.target.email.value,
      photos: images
    };
    if (!validate(answerData.email)) {
      alert('The email address provided is not in correct email format.');
    }
    if (answerData.photos.length > 5) {
      alert('Only max of 5 photos allowed');
    }
    axios.post(`/qa/questions/${question_id}/answers`, answerData)
      .then(() => setIsOpen(false))
      .catch(err => console.log(err));
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
        <AnswersList questionId={question_id} />
      </div>
    </div >
  );
};

export default IndividualQuestion;