import React, { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import Stars from './Stars.jsx';
import { useForm } from "react-hook-form";

const AddReviewModal = ({ prodName, addReview, open, onClose, product_id, metaData }) => {

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

  const [ rating, setRating ] = useState(0);
  const [ star, setStar ] = useState();
  const [ photos, setPhotos ] = useState([]);
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const [ characteristics, setCharacteristics ] = useState({});
  const { register, handleSubmit } = useForm();

  if (!open) {
    return null;
  }

  const massageCharacteristics = () => {
    // TODO: take characteristics from form data and convert it to an object that the api will recognize
  }

  const registerOptions = {
    rating: {
      required: "rating is required",
      maxLength: 5,
    },
    recommend: {
      required: "recommend is required",
    },
    characteristics: {
      required: "characteristics is required",
    },
    summary: {
      maxLength: {
        value: 60,
        message: "summary must have no more than 60 characters"
      },
    },
    body: {
      required: "body is required",
      minLength: {
        value: 50,
        message: "body must have no less than 50 characters",
      },
      maxLength: {
        value: 1000,
        message: "body must have no more than 1000 characters"
      },
    },
    photos: {
      maxLength: 5,
    },

    name: {
      required: "Name is required",
      maxLength: {
        value: 60,
        message: "name must have no more than 60 characters"
      },
    },
    email: {
      required: "Email is required",
      maxLength: {
        value: 60,
        message: "email must have no more than 60 characters"
      },
    },
  };

  const onFormSubmit  = (data) => {
    console.log('data to be submitted', data);
    // addReview(data);
  }

  const onErrors = (errors) => {
    console.error('errors', errors);
  }

  return ReactDom.createPortal(
    <>
    {/* <div onClick={onClose}/>
    <div> */}
      <div className="overlay-styles" onClick={onClose}/>
      <div className="modal-styles">
        <div className="form-container">
          <h1>Write Your Review</h1>
          <h3>{`About the ${prodName}`}</h3>
          <Stars setStar={setStar} />
          <form onSubmit={handleSubmit(onFormSubmit, onErrors)} >
            <div>
              <label>Do you recommend this product?
                <br></br>
                <input type="radio" value="true" name="recommend" {...register('recommend', registerOptions.recommend)}/>Yes
                <input type="radio" value="false" name="recommend" {...register('recommend', registerOptions.recommend)}/>No
              </label>
            </div>
            &nbsp;
            <div>

              <br></br>
              <h3>Characteristics
              </h3>
              {characteristicsArray.map((char, index) => {
                return (
                  <div key={index} onChange={massageCharacteristics}>
                    <div>{char[0]}</div>
                    <label>1</label>
                    <input type="radio" value="1" name="characteristics" {...register('characteristics', registerOptions.characteristics)}/>
                    &nbsp;
                    &nbsp;
                    <label>2</label>
                    <input type="radio" value="2" name="characteristics" {...register('characteristics', registerOptions.characteristics)}/>
                    &nbsp;
                    &nbsp;
                    <label>3</label>
                    <input type="radio" value="3" name="characteristics" {...register('characteristics', registerOptions.characteristics)}/>
                    &nbsp;
                    &nbsp;
                    <label>4</label>
                    <input type="radio" value="4" name="characteristics" {...register('characteristics', registerOptions.characteristics)}/>
                    &nbsp;
                    &nbsp;
                    <label>5</label>
                    <input type="radio" value="5" name="characteristics" {...register('characteristics', registerOptions.characteristics)}/>
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
                {...register('summary', registerOptions.summary)}
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
                {...register('body', registerOptions.body)}
              />
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
                {...register('name', registerOptions.name)}
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
                type="text"
                placeholder="Example: jackson11@email.com"
                name="email"
                {...register('email', registerOptions.email)}
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