import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItems from './RelatedItems.jsx';
import OutfitCreation from './OutfitCreation.jsx';

const productId = 40351;

const RelatedItemsAndOutfits = () => {
  useEffect(() => {
    axios.get('/products')
      .then(result => console.log('all products', result))
  });

  return (
    <>
      <RelatedItems productId={productId}/>
      <br></br>
      <OutfitCreation productId={productId}/>
    </>
  );
};


export default RelatedItemsAndOutfits;