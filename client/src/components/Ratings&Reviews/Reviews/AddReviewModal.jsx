import React, { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import Stars from './Stars.jsx';
import { validate } from 'react-email-validator';

const AddReviewModal = ({ prodName, addReview, open, onClose, product_id, metaData }) => {

  const [ recommend, setRecommend ] = useState(false);
  const [ rating, setRating ] = useState(0);
  const [ star, setStar ] = useState();
  const [ images, setImages ] = useState([]);
  const [ body, setBody ] = useState('');

  const summary = useRef('');
  const name = useRef('');
  const email = useRef('');

  // convert chraracteristics object into an array for mapping purposes and add ratings details
  let chararcteristicsObj = metaData.characteristics
  let characteristicsArray = []
  if (chararcteristicsObj) {
    characteristicsArray = Object.entries(chararcteristicsObj)
  }
  for (let i = 0; i < characteristicsArray.length; i++) {
    switch (characteristicsArray[i][0]) {
      case "Size":
        characteristicsArray[i].push("1 = A size too small");
        characteristicsArray[i].push("5 = A size too wide");
        break;
      case "Width":
        characteristicsArray[i].push("1 = Too narrow");
        characteristicsArray[i].push("5 = Too wide");
        break;
      case "Comfort":
        characteristicsArray[i].push("1 = uncomfortable");
        characteristicsArray[i].push("5 = Perfect");
        break;
      case "Quality":
        characteristicsArray[i].push("1 = Poor");
        characteristicsArray[i].push("5 = Perfect");
        break;
      case "Length":
        characteristicsArray[i].push("1 = Runs Short");
        characteristicsArray[i].push("5 = Runs Long");
        break;
      case "Fit":
        characteristicsArray[i].push("1 = Runs tight");
        characteristicsArray[i].push("5 = Runs long");
        break;
      default:
        console.log('no characteristics details added');
        break;
    }
  }

  // photo uploader
  const photoWidget = cloudinary.createUploadWidget(
    {
      cloudName: 'dgjzqkjh0',
      uploadPreset: 'Add Review Form'
    },
    (error, result) => {
      if (error) {
        console.log('error uploading photo', error);
      }
      if (!error && result && result.event === "success") {
        console.log('result.info.url', result.info.url);
        setImages([...images, result.info.url]);
      }
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // convert characteristics back into an object for the post request
    let charsObj = {};
    for (let i = 0; i < characteristicsArray.length; i++) {
      charsObj[characteristicsArray[i][1].id] = characteristicsArray[i][1].value
    }

    let data = {
      product_id: product_id,
      rating: star,
      summary: event.target.summary.value,
      body: event.target.body.value,
      recommend: recommend,
      name: event.target.name.value,
      email: event.target.email.value,
      photos: images,
      characteristics: charsObj,
    }
    addReview(data);
  }

  // show the user how many words are left before the body is complete
  const showCounter = () => {
    let counter = body.length;
    let left = 50 - body.length;
    console.log('left', left);
    return `Minimum required characters left: ${left}`
  }

  // if the modal isn't open, return null
  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" onClick={onClose}/>
      <div className="modal-styles">
        <div className="form-container">
          <h1>Write Your Review</h1>
          <h3>{`About the ${prodName}`}</h3>
          <Stars setStar={setStar} />
          <form onSubmit={(event) =>
            handleSubmit(event)} >
            <div>
              <label>Do you recommend this product?
                <br></br>
                <input type="radio"  value="true" checked={recommend === true} name="recommend" required onChange={() => {
                  setRecommend(true)
                  }} />Yes
                <input type="radio" value="false"checked={recommend === false} name="recommend" required onChange={() => {
                  setRecommend(false)
                }}/>No
              </label>
            </div>
            <div>
              <h3>Characteristics
              </h3>
              {characteristicsArray.map((char, index) => {
                return (
                  <div key={index} >
                    <div>{char[0]}</div>
                    <label>1</label>
                    <input type="radio" value="1" name={char[0]} required onClick={() => {
                      char[1].value = 1
                    }}/>
                    &nbsp;
                    &nbsp;
                    <label>2</label>
                    <input type="radio" value="2" name={char[0]} required onClick={() => {
                      char[1].value = 2
                    }}/>
                    &nbsp;
                    &nbsp;
                    <label>3</label>
                    <input type="radio" value="3" name={char[0]} required onClick={() => {
                      char[1].value = 3
                    }}/>
                    &nbsp;
                    &nbsp;
                    <label>4</label>
                    <input type="radio" value="4" name={char[0]} required onClick={() => {
                      char[1].value = 4
                    }}/>
                    &nbsp;
                    &nbsp;
                    <label>5</label>
                    <input type="radio" value="5" name={char[0]} required onClick={() => {
                      char[1].value = 5
                    }}/>
                    <div>{char[2]} &nbsp; {char[3]}</div>
                    &nbsp;
                  </div>
                )
              })}
            </div>
            <br></br>
            <div>
              <div>
                <label>
                  A Brief Summary - 60 characters or less
                </label>
              </div>
              <textarea
                type="text"
                className="form-control"
                name="summary"
                placeholder="Example: Best purchase ever!"
                ref={summary}
                maxLength="60"
              />
            </div>
            &nbsp;
            <div>
              <div>
                <label>
                  Full Review - up to 1000 characters
                </label>
              </div>
              <textarea
                className="form-control"
                type="text"
                placeholder="Why did you like the product or not?"
                name="body"
                maxLength="1000"
                minLength="50"
                required
                onChange={(event) => {
                  setBody(event.target.value);
                }}
              />
            </div>
            {body.length < 50 &&
            <small>
              {showCounter()}
            </small>}
            {body.length >= 50 &&
              <small>
                Maximum reached
              </small>}
            <br></br>
            &nbsp;

            <div className="answer-photo">
              {images.length < 5 &&
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    photoWidget.open();
                  }}>Upload photos
                </button>}
              &nbsp;
              {images && images.map((image, index) => {
                return <img key={index} src={`${image}`} width="70" height="70" />
              })}
              {images.length > 0 &&
                <div>
                  <small>Images uploaded: {images.length}</small>
                </div>
              }
            </div>

            &nbsp;
            <div>
              <div>
                <label>
                  Enter your username
                </label>
              </div>
              <input
                className="form-control"
                type="text"
                placeholder="Example: jackson11!"
                name="name"
                required
              />
              <div>
                <small>
                  For privacy reasons, do not use your full name or email address
                </small>
              </div>
            </div>
            &nbsp;
            <div>
              <div>
                <label>
                  Enter your email address
                </label>
              </div>
              <input
                className="form-control"
                type="email"
                size="60"
                maxLength="60"
                placeholder="Example: jackson11@email.com"
                name="email"
                required
              />
              <div>
                <small>
                  For authentication reasons, you will not be emailed
                </small>
              </div>
            </div>
            &nbsp;
            <div>
              <input type="submit"/>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('modal')
  );
}

export default AddReviewModal;