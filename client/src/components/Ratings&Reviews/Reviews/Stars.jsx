import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
// npm install react-icons --save

const Stars = ({ setStar }) => {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    setStar(ratingValue);
    console.log({ratingValue});

    switch (ratingValue) {
      case 5:
        alert('5 stars - Great');
        break;
      case 4:
        alert('4 stars - Good');
        break;
      case 3:
        alert('3 stars - Average');
        break;
      case 2:
        alert('2 stars - Fair');
        break;
      case 1:
        alert('1 star - Poor');
        break;
      default:
        alert('product is not rated 1-5');
        break;
    }
  };

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <button
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
            >
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "gold" : "lightgray"}
              size={20}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
            </button>
          </label>
        );
      })}
      <p>I rate this product {rating + " stars"}</p>
    </div>
  );
};

export default Stars;