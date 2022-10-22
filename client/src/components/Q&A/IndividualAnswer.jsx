import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import DisplayPhotoModal from './DisplayPhotoModal.jsx';

// individual answer - Integrate into AnswersList.jsx
const IndividualAnswer = ({ answer, handleHelpful, handleReport }) => {
  // console.log('individual answer: ', answer);
  const [report, setReport] = useState(false);
  const [photoClicked, setPhotoClicked] = useState(false);
  const [image, setImage] = useState();

  const { body, answerer_name, date, photos, helpfulness } = answer;

  const showPhotos = () => {
    if (photos.length) {
      return photos.map(photo => {
        return <img src={photo.url} width="90" height="60"
          onClick={() => {
            setImage(photo);
            setPhotoClicked(true);
          }} />;
      });
    }
  };

  const setPhotos = () => {
    if (photos.length) {
      return <p className="photos">{showPhotos()} <DisplayPhotoModal photoClicked={photoClicked} setPhotoClicked={setPhotoClicked} photo={image} /></p>;
    }
  };

  return (
    <div className="individual-answer" data-testid="answer-modal-inputs">
      <p className="individual-answer-body">
        {body}
      </p>

      {setPhotos()}

      <p className="answer-name-and-date">
        by {answerer_name}, {format(parseISO(date), 'MMMM dd, yyyy')}
      </p>

      <p className="answer-helpfulness">
        Helpful? <em><span onClick={() => handleHelpful(answer)}>Yes</span> ({helpfulness})</em>
      </p>

      <p className="answer-report">
        {!report && <button onClick={() => {
          setReport(true);
          handleReport(answer);
        }}>Report</button>}
        {report && <span>Reported</span>}
      </p>
    </div>
  );
};

export default IndividualAnswer;