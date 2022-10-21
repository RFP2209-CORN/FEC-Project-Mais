import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

// individual answer - Integrate into AnswersList.jsx
const IndividualAnswer = ({ answer, handleHelpful, handleReport }) => {
  console.log('individual answer: ', answer);

  // destructoring answer object
  const { body, answerer_name, date, photos, helpfulness } = answer;

  const showPhotos = () => {
    if (photos.length) {
      return photos.map(photo => {
        return <img src={photo.url} />;
      });
    }
  };

  return (
    <div className="individual-answer" data-testid="answer-modal-inputs">
      <p className="individual-answer-body">
        {body}
      </p>

      <p className="answer-name-and-date">
        {answerer_name}, {formatDistanceToNow(parseISO(date))}
      </p>

      <p className="photos">
        {showPhotos()}
      </p>

      <div className="answer-helpfulness">
        Helpful? <span onClick={() => handleHelpful(answer)}>Yes</span> ({helpfulness}) <button className="answer-report" onClick={(e) => handleReport(e, answer)}>Report</button>
      </div>
    </div>
  );
};

export default IndividualAnswer;