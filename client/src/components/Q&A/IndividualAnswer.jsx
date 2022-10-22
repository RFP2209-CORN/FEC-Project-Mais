import React, { useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

// individual answer - Integrate into AnswersList.jsx
const IndividualAnswer = ({ answer, handleHelpful, handleReport }) => {
  // console.log('individual answer: ', answer);
  const [report, setReport] = useState(false);

  const { body, answerer_name, date, photos, helpfulness } = answer;

  const showPhotos = () => {
    if (photos.length) {
      return photos.map(photo => {
        return <img src={photo.url} width="90" height="60"/>;
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

      <p className="photos" >
        {showPhotos()}
      </p>

      <p className="answer-helpfulness">
        Helpful? <span onClick={() => handleHelpful(answer)}>Yes</span> ({helpfulness}) {!report && <button className="answer-report"
          onClick={() => {
            setReport(true);
            handleReport(answer);
          }}>Report</button>}
        {report && <span>Reported</span>}
      </p>
    </div>
  );
};

export default IndividualAnswer;