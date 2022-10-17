import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';

const OutfitCreation = ({ productId, calcRating, saleAndImageSetter, renderPrice }) => {
  const [outfits, setOutfits] = useState([]);

  // TODO: useEffect to pull outfit data from local storage

  const addOutfit = () => {
    axios.get(`/products/${productId}`)
      .then(product => {
        let outfitAdded = false;

        for (let i = 0; i < outfits.length; i++) {
          if (outfits[i].id === product.data.id) {
            outfitAdded = true;
          }
        }
        if (outfitAdded === false) {
          setOutfits(currOutfits => {
            return [...currOutfits, product.data];
          });

          // TODO: add outfit to local storage
        }
      });
  };

  const renderBlankCards = (outfitLength) => {
    if (outfitLength === 0) {
      return (
        <>
          <div className="card card-shadow"></div>
          <div className="card card-shadow"></div>
          <div className="card card-shadow"></div>
        </>
      );
    } else if (outfitLength === 1) {
      return (
        <>
          <div className="card card-shadow"></div>
          <div className="card card-shadow"></div>
        </>
      );
    } else if (outfitLength === 2) {
      return (
        <>
          <div className="card card-shadow"></div>
        </>
      );
    }

  };

  return (
    <div className="card-container">
      <div className="card add-outfit card-shadow">
        <i className="fa-solid fa-plus add-outfit-btn" onClick={addOutfit}> Add to Outfit</i>
      </div>
      {outfits.map((outfit) => {
        return (
          <OutfitCard
            key={outfit.id}
            outfit={outfit}
            calcRating={calcRating}
            saleAndImageSetter={saleAndImageSetter}
            renderPrice={renderPrice}
          />
        );
      })}
      {outfits.length <= 2 && renderBlankCards(outfits.length)}
    </div>
  );
};

export default OutfitCreation;