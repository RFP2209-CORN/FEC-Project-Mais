import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

// individual answer - Integrate into AnswersList.jsx
const IndividualAnswer = ({ answer, handleHelpful, handleReport }) => {
  // console.log('individual answer: ', answer);

  // destructoring answer object
  const { body, answerer_name, date, photos, helpfulness } = answer;

  return (
    <div className="individual-answer">
      {/* Format of answer, NOT yet completed */}
      <p className="individual-answer-body">
        Text Body: {body} <br />
      </p>

      <p className="answer-name-and-date">
        {answerer_name}, {formatDistanceToNow(parseISO(date))} <br />
      </p>

      <p>
        {/* Answer Photos - might be another file due to photo array */}
        {/* Photos: {[photos].length > 0 && photos[0]} */}
      </p>

      <div className="answer-helpfulness">
        Helpful? <span onClick={() => handleHelpful(answer)}>Yes</span> ({helpfulness}) <button className="answer-report" onClick={(e) => handleReport(e, answer)}>Report</button>
      </div>
    </div>
  );
};

export default IndividualAnswer;