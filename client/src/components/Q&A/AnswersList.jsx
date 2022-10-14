import React, { useState } from 'react';
import IndividualAnswer from './IndividualAnswer.jsx';

// List of answers - Integrate into IndividualQuestion.jsx
const AnswersList = ({ answersList }) => {
  // console.log('answersList: ', answersList)

  // convert answersList Object into array for easy iteration
  let convertAnswersListToArray = []
  for (let key in answersList) {
    convertAnswersListToArray.push(answersList[key])
  }

  return (
    <div>
      {/* if array length is 0, respond with no answers given */}
      {!convertAnswersListToArray.length && 'There are no answers yet'}

      {/* if array length is at least 1 map array for individual answer */}
      {convertAnswersListToArray.length &&
        convertAnswersListToArray.map(answer => {
          return <IndividualAnswer answer={answer} key={answer.id} />
        })}
    </div>
  )
};

export default AnswersList;