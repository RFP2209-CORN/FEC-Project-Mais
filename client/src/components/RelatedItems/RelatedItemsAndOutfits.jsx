import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItems from './RelatedItems.jsx';
import OutfitCreation from './OutfitCreation.jsx';

const productId = 40344;

const RelatedItemsAndOutfits = () => {


  return (
    <>
      <RelatedItems productId={productId}/>
      <OutfitCreation/>
    </>
  );
};


export default RelatedItemsAndOutfits;