import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import star from '../../../assets/images/star.png';

// takes in a rating and renders 5 stars filled in proportionally with the provided rating, rounded to the nearest .25
const StarRating = ({ rating }) => {

  // console.log('rating from starRating.jsx', rating);

  let stars = [];
  while (stars.length < 5) {
    if (rating > 1) {
      stars.push(1);
    }
    else if (rating > 0) {
      let empty = Math.abs(0 - rating);
      let oneQuarter = Math.abs(0.25 - rating);
      let half = Math.abs(0.5 - rating);
      let threeQuarters = Math.abs(0.75 - rating);
      let full = Math.abs(1 - rating);
      let closest = Math.min(empty, oneQuarter, half, threeQuarters, full);
      switch (closest) {
        case (empty):
          stars.push(0);
          break;
        case oneQuarter:
          stars.push(0.25);
          break;
        case half:
          stars.push(0.5);
          break;
        case threeQuarters:
          stars.push(0.75);
          break;
        case full:
          stars.push(1.0);
          break;
        default:
          console.log("OOPS");
          stars.push(0);
          break;
      }
    } else {
      stars.push(0);
    }
    rating = rating - 1;
  }

  // console.log('stars', stars);

  return (
    <div>
      {stars.map((item, i) => {
        return (
          <div className="single-star-container" key={i}>
            <div className="single-star-fill" style={{"color": "gold", "width" : `${parseInt(item * 100)}%`}}>
            <img className="single-star-outline"
            src={star} />
            </div>
          </div>
        );
      })}
    </div>
  );

};

export default StarRating;

