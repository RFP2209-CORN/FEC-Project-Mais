import React, { useState } from 'react';
import AnswersList from './AnswersList.jsx';
import AddAnswerModal from './AddAnswerModal.jsx';
import { formatDistanceToNow, parseISO } from 'date-fns';
import axios from 'axios';
import { validate } from 'react-email-validator';

// Individual question - Integrate into QuestionsList.jsx
const IndividualQuestion = ({ question, handleHelpful, handleReport, product }) => {
  // console.log('Individual question: ', question);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const { asker_name, question_body, question_helpfulness, question_date, question_id } = question;

  const onClose = () => {
    setIsOpen(false);
  };

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
    });

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    const query = {
      body: e.target.answer.value,
      name: e.target.name.value,
      email: e.target.email.value,
      photos: images
    };

    if (!validate(query.email)) {
      alert('incorrect email format');
    }
    if (query.photos.length > 5) {
      alert('Only max of 5 photos allowed');
    }

    axios.post(`/qa/questions/${question_id}/answers`, query)
      .then(() => {
        onClose();
      });
  };

  const renderAnswerList = () => {
    return <AnswersList questionId={question_id} />;
  };

  return (
    <div className="individual-question">
      <p className="question-body">
        <b>Q:</b> {question_body}
      </p>

      <p className="question-info">
        {asker_name}, {formatDistanceToNow(parseISO(question_date))}
      </p>

      <p className="question-helpfulness">
        Helpful? <span onClick={() => { handleHelpful(question); }}>Yes</span> ({question_helpfulness}) <button className="question-report" onClick={(e) => handleReport(e, question)}>Report</button>
      </p>

      <span>
        <button className="add-answer" onClick={() => setIsOpen(true)} >Add Answer</button>
        <AddAnswerModal open={isOpen} onClose={onClose} question={question_body} submitAnswer={handleSubmitAnswer} product={product} photoWidget={photoWidget} images={images}/>
      </span>

      <div>
        <b>A:</b> {renderAnswerList()}
      </div>
    </div >
  );
};

export default IndividualQuestion;