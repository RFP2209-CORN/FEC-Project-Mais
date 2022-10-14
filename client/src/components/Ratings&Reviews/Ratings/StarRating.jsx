import React, { useState } from 'react';

const StarRating = ({ rating }) => {

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
          console.log("OOPS");
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
                  <div className="single-star-container" key={i}>
                      <div className="single-star-fill" style={{"width" : `${parseInt(item*31)}px`}}>
                          <img className="single-star-outline" src="star.png" alt="stars alt"></img>
                      </div>
                  </div>
              );
          })}
      </div>
  );


 };

export default StarRating;

