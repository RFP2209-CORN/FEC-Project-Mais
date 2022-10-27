import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

const Stars = ({ setStar }) => {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [hoverText, setHoverText] = useState('');

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    setStar(ratingValue);
    setHoverText('');
  };

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <button className="textButton"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
            >
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "gold" : "lightgray"}
              size={35}
              onMouseEnter={() => {
                setHover(ratingValue);
                setHoverText(ratingValue);
                // setStar(ratingValue);
              }}
              onMouseLeave={() => {
                setHover(null);
                setHoverText('');
              }}
            />
            </button>
          </label>
        );
      })}
      {
        hoverText
        ? <p>I rate this product {hoverText + " stars"}</p>
        : <p>I rate this product {rating + " stars"}</p>
      }
    </div>
  );
};

export default Stars;