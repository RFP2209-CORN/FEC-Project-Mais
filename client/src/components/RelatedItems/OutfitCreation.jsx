import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';

const OutfitCreation = ({ productId, calcRating, saleAndImageSetter, renderPrice, updateProduct, getProductReviews, product }) => {
  const [outfits, setOutfits] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setDisplayItems([]);

    let outfitStorage = localStorage.getItem('outfitStorage');
    outfitStorage = outfitStorage ? JSON.parse(outfitStorage) : [];
    setOutfits(outfitStorage);

    let toDisplay = [];
    for (let i = 0; i < 4 && i < outfitStorage.length; i++) {
      toDisplay.push(outfitStorage[i]);
    }
    setDisplayItems(toDisplay);
  }, []);

  const changeDisplay = (direction) => {
    if (direction === 'left' && startIndex > 0) {
      let toDisplay = [];
      for (let i = startIndex - 1; i < startIndex + 3; i++) {
        toDisplay.push(outfits[i]);
      }
      setStartIndex(startIndex - 1);
      setDisplayItems(toDisplay);
    }
    if (direction === 'right' && startIndex + 4 <= outfits.length - 1) {
      let toDisplay = [];
      for (let i = startIndex + 1; i < startIndex + 5; i++) {
        toDisplay.push(outfits[i]);
      }
      setStartIndex(startIndex + 1);
      setDisplayItems(toDisplay);
    }
  };

  const addOutfit = () => {
    /* LIST OF CHANGES // delete all comment after read
    removed get requests,
    added product as properties passed from parent,
    changed all product.data to just product*/

    // axios.get(`/products/${productId}`)
    //   .then(product => {
    let outfitAdded = false;
    for (let i = 0; i < outfits.length; i++) {
      if (outfits[i].id === product.id) {
        outfitAdded = true;
      }
    }
    if (outfitAdded === false) {
      setOutfits(currOutfits => {
        return [...currOutfits, product];
      });
      // Set local storage
      let outfitStorage = localStorage.getItem('outfitStorage');
      outfitStorage = outfitStorage ? JSON.parse(outfitStorage) : [];
      outfitStorage.push(product);
      localStorage.setItem('outfitStorage', JSON.stringify(outfitStorage));

      let toDisplay = [];
      setDisplayItems([]);
      if (outfitStorage.length < 4) {
        setDisplayItems(outfitStorage);
      } else {
        for (let i = outfitStorage.length - 4; i < outfitStorage.length; i++) {
          setDisplayItems(currDisplay => {
            return [...currDisplay, outfitStorage[i]];
          });
        }
        setStartIndex(outfitStorage.length - 4);
      }
    }
    // });
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

    setDisplayItems([]);
    if (newLocalStorage.length <= 4) {
      setDisplayItems(newLocalStorage);
      setStartIndex(0);
    } else {
      if (newLocalStorage[startIndex + 4] !== undefined) {
        for (let i = startIndex; i < 4; i++) {
          setDisplayItems(currDisplay => {
            return [...currDisplay, newLocalStorage[i]];
          });
        }
      } else {
        for (let i = newLocalStorage.length - startIndex; i < 4; i++) {
          setDisplayItems(currDisplay => {
            return [...currDisplay, newLocalStorage[i]];
          });
        }
      }
    }
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
      <i className="fa-solid fa-arrow-left-long cards-arrow" onClick={() => { changeDisplay('left'); }} />
      <div id="card-container-related">
        <div className="card add-outfit card-shadow">
          <i className="fa-solid fa-plus add-outfit-btn" onClick={addOutfit}> Add to Outfit</i>
        </div>
        {displayItems.map((outfit) => {
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
        {displayItems.length <= 2 && renderBlankCards(outfits.length)}
      </div>
      <i className="fa-solid fa-arrow-right-long cards-arrow" onClick={() => { changeDisplay('right'); }} />
    </div>
  );
};

export default OutfitCreation;