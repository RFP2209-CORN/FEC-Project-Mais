import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';

const OutfitCreation = ({ productId, calcRating, saleAndImageSetter }) => {
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

  return (
    <div>
      Outfit Creation
      <button onClick={addOutfit} name="facebook"><i className="fa-solid fa-plus"></i> Add to Outfit</button>
      {outfits.map((outfit) => {
        return <OutfitCard key={outfit.id} outfit={outfit} calcRating={calcRating} saleAndImageSetter={saleAndImageSetter}/>;
      })}
    </div>
  )
};

export default OutfitCreation;