import React, { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import Stars from './Stars.jsx';
// import { useForm } from "react-hook-form";
import { validate } from 'react-email-validator';

const AddReviewModal = ({ prodName, addReview, open, onClose, product_id, metaData }) => {

  const [ rating, setRating ] = useState(0);
  const [ star, setStar ] = useState();
  const [ photos, setPhotos ] = useState([]);
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const [ characteristics, setCharacteristics ] = useState({});
  const [ body, setBody ] = useState('');
  // const { register, handleSubmit } = useForm();
  const { recommend, setRecommend } = useState(false);

  // const body = useRef('');
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

  console.log({characteristicsArray});

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
        setPhotos([...photos, result.info.url]);
      }
    }
  );

  if (!open) {
    return null;
  }

  const massageCharacteristics = () => {
    // TODO: take characteristics from form data and convert it to an object that the api will recognize
  }

  const handleSubmit = () => {
    let data = {
      product_id: product_id,
      rating: star,
      summary: summary,
      body: body,
      recommend: recommend,
      name: name,
      email: email,
      photos: photos,
      characteristics: characteristics,
      // {"14": 5, "15": 5}
    }
    console.log('data to be submitted', data);
    // console.log('star', star, 'recommend', recommend, 'characteristics', characteristics, 'summary', summary, 'body', body, 'name', name, 'email', email);
    // addReview(data);
  }

  const showCounter = () => {
    let counter = body.length;
    let left = 50 - body.length;
    console.log('left', left);
    return `Minimum required characters left: ${left}`
  }

  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" onClick={onClose}/>
      <div className="modal-styles">
        <div className="form-container">
          <h1>Write Your Review</h1>
          <h3>{`About the ${prodName}`}</h3>
          <Stars setStar={setStar} />
          <form onSubmit={handleSubmit} >
            <div>
              <label>Do you recommend this product?
                <br></br>
                <input type="radio"  value="true" name="recommend" required onClick={() => {
                  setRecommend(true)}} />Yes
                <input type="radio" value="false" name="recommend" required onClick={() => {
                  setRecommend(false)
                }}/>No
              </label>
            </div>
            <div>
              <h3>Characteristics
              </h3>
              {characteristicsArray.map((char, index) => {
                return (
                  <div key={index} onChange={massageCharacteristics}>
                    <div>{char[0]}</div>
                    <label>1</label>
                    <input type="radio" value="1" name="1" required/>
                    &nbsp;
                    &nbsp;
                    <label>2</label>
                    <input type="radio" value="2" name="2" required />
                    &nbsp;
                    &nbsp;
                    <label>3</label>
                    <input type="radio" value="3" name="3" required />
                    &nbsp;
                    &nbsp;
                    <label>4</label>
                    <input type="radio" value="4" name="4" required />
                    &nbsp;
                    &nbsp;
                    <label>5</label>
                    <input type="radio" value="5" name="5" required />
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
              {photos.length < 5 &&
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    photoWidget.open();
                  }}>Upload photos
                </button>}
              &nbsp;
              <img src={photos[photos.length - 1]} width="70" height="70" />
              {photos?.length && <span>Images uploaded: {photos.length}</span>}
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
                ref={name}
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
                ref={email}
              />
              <div>
                <small>
                  For authentication reasons, you will not be emailed
                </small>
              </div>
            </div>
            &nbsp;
            <div>
              <button>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('modal')
  );
}

export default AddReviewModal;