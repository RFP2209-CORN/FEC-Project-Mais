import React, { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import Stars from './Stars.jsx';

const AddReviewModal = ({ prodName, handleSubmit, open, onClose, product_id, metaData }) => {

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
  const [ recommend, setRecommend ] = useState(false);
  const [ photos, setPhotos ] = useState([]);
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const [ characteristics, setCharacteristics ] = useState({});

  const summaryRef = useRef();
  const bodyRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();

  if (!open) {
    return null;
  }

  const massageCharacteristics = () => {

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
                <input type="radio" value="true" name="recommend"  onClick={() => setRecommend(true)} />Yes
                <input type="radio" value="false" name="recommend" onClick={() => setRecommend(false)}/>No
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
                    <input type="radio" value="1" name="characteristics"/>
                    &nbsp;
                    &nbsp;
                    <label>2</label>
                    <input type="radio" value="2" name="characteristics"/>
                    &nbsp;
                    &nbsp;
                    <label>3</label>
                    <input type="radio" value="3" name="characteristics"/>
                    &nbsp;
                    &nbsp;
                    <label>4</label>
                    <input type="radio" value="4" name="characteristics"/>
                    &nbsp;
                    &nbsp;
                    <label>5</label>
                    <input type="radio" value="5" name="characteristics"/>
                    <div>{char[2]} &nbsp; {char[3]}</div>
                    &nbsp;
                    {/* <div>
                      {switch (`${char[0]}`) {
                        case "Size":
                          <div>
                            1 = A size too small
                            5 = A size too wide
                          </div>
                          break;
                        case "Width":
                          <div>
                            1 = Too narrow
                            5 = Too wide
                          </div>
                          break;
                        case "Comfort":
                          <div>
                            1 = uncomfortable
                            5 = Perfect
                          </div>
                          break;
                        case "Quality":
                          <div>
                            1 = Poor
                            5 = Perfect
                          </div>
                          break;
                        case "Length":
                          <div>
                            1 = Runs Short
                            5 = Runs Long
                          </div>
                          break;
                        case "Fit":
                          <div>
                            1 = Runs tight
                            5 = Runs long
                          </div>
                          break;
                        default:
                          <div>
                            No characteristics
                          </div>
                          break;
                      }}
                    </div> */}
                  </div>
                )
              })}
            </div>
            <br></br>
            <div>
              <div>
                A Brief Summary - 60 characters or less
              </div>
              <textarea
                className="form-control"
                type="text"
                placeholder="Example: Best purchase ever!"
                ref={summaryRef}
              />
            </div>
            &nbsp;
            <div>
              <div>
                Full Review - up to 1000 characters
              </div>
              <textarea
                className="form-control"
                type="text"
                placeholder="Why did you like the product or not?"
                ref={bodyRef}
              />
            </div>
            &nbsp;
            <div>
              <div>
                Enter your username
              </div>
              <input
                className="form-control"
                type="text"
                placeholder="Example: jackson11!"
                ref={usernameRef}
              />
            </div>
            &nbsp;
            <div>
              <div>
                Enter your email address
              </div>
              <textarea
                className="form-control"
                type="text"
                placeholder="Example: jackson11@email.com"
                ref={emailRef}
              />
            </div>
            &nbsp;
            <input type="submit" className="btn-modal">
            </input>
          </form>
        </div>
      </div>
    </>,
    document.getElementById('modal')
  );
}

export default AddReviewModal;