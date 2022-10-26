import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';

const OutfitCreation = ({ productId, calcRating, saleAndImageSetter, renderPrice, updateProduct, getProductReviews }) => {
  const [outfits, setOutfits] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    let outfitStorage = localStorage.getItem('outfitStorage');
    outfitStorage = outfitStorage ? JSON.parse(outfitStorage) : [];
    setOutfits(outfitStorage);
  }, []);

  const changeDisplay = (direction) => {
    if (direction === 'left' && startIndex > 0) {
      console.log('left')
      setStartIndex(startIndex - 1);
      document.getElementById('card-container-related').scrollBy(-255, 0);
    }
    if (direction === 'right' && startIndex + 4 <= relatedItems.length - 1) {
      console.log('right')
      setStartIndex(startIndex + 1);
      document.getElementById('card-container-related').scrollBy(255, 0);
    }
  };

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
          // Set local storage
          let outfitStorage = localStorage.getItem('outfitStorage');
          outfitStorage = outfitStorage ? JSON.parse(outfitStorage) : [];
          outfitStorage.push(product.data);
          localStorage.setItem('outfitStorage', JSON.stringify(outfitStorage));
        }
      });
  };

  const removeOutfit = (event) => {
    event.stopPropagation();

    const productToRemove = parseInt(event.target.value);
    const newOutfits = outfits.filter((outfit) => outfit.id !== productToRemove);
    setOutfits(newOutfits);

    let outfitStorage = localStorage.getItem('outfitStorage');
    outfitStorage = JSON.parse(outfitStorage);
    const newLocalStorage = outfitStorage.filter((outfit) => outfit.id !== productToRemove);
    localStorage.setItem('outfitStorage', JSON.stringify(newLocalStorage));
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
    <div className="card-container-container">
      <i className="fa-solid fa-arrow-left-long cards-arrow" onClick={() => { changeDisplay('left'); }}/>
      <div id="card-container-related">
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
              updateProduct={updateProduct}
              removeOutfit={removeOutfit}
              getProductReviews={getProductReviews}
            />
          );
        })}
        {outfits.length <= 2 && renderBlankCards(outfits.length)}
      </div>
      <i className="fa-solid fa-arrow-right-long cards-arrow" onClick={() => { changeDisplay('right'); }}/>
    </div>
  );
};

export default OutfitCreation;