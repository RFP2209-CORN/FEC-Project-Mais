import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

// individual answer - Integrate into AnswersList.jsx
const IndividualAnswer = ({ answer }) => {
  // console.log('individual answer: ', answer);

  // destructoring answer object
  const { body, answerer_name, date, photos } = answer;

  return (
    <div>
      {/* Format of answer, NOT yet completed */}
      Text Body: {body} <br />
      Answerer's Name{answerer_name}, <br />
      Date answered: {formatDistanceToNow(parseISO(date))} <br />

      {/* Answer Photos - might be another file due to photo array */}
      Photos: {[photos].length > 0 && photos[0]}

      <div>
        Helpful? {answer.helpfulness}
      </div>
      <div>
        Report(btn)
      </div>
    </div>
  )
};

export default IndividualAnswer;