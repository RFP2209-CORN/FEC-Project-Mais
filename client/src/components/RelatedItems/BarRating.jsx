import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
// import emptyBar from '../../../assets/images/emptyBar.png';
import emptyBar from './emptyBar.png';

// takes in a rating and renders 5 stars filled in proportionally with the provided rating, rounded to the nearest .25
const BarRating = ({ rating }) => {

  let stars = [];
  while (stars.length < 5) {
    if (rating > 1) {
      stars.push(1);
    } else if (rating > 0) {
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
        stars.push(0);
        break;
      }
    } else {
      stars.push(0);
    }
    rating = rating - 1;
  }

  return (
    <div>
      {stars.map((item, i) => {
        return (
          <div className="bar-rating-container" key={i}>
            <div className="bar-rating-outline">
              {item < 1 &&
                <div className="bar-rating-icon" style={{
                  'left': `${parseInt(item * 100)}%`,
                }}>
                  X
                  {/* <div className="bar-rating-fill" style={{
                  'color': 'gold',
                  'width': `${parseInt(item * 100)}%`,
                }}> */}
                </div>
              }

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BarRating;

