import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItemsCard from './RelatedItemsCard.jsx';

const RelatedItems = ({ productId, calcRating, saleAndImageSetter, renderPrice, updateProduct }) => {
  const [relatedItems, setRelatedItems] = useState([]);
  // const [displayItems, setDisplayItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setRelatedItems([]);
    // setDisplayItems([]);
    axios.get(`/products/${productId}/related`)
      .then(relatedProducts => {
        // console.log(relatedProducts)
        // let count = 0;
        for (let id of relatedProducts.data) {
          axios.get(`/products/${id}`)
            .then(product => {
              setRelatedItems(currProducts => {
                return [...currProducts, product.data];
              });
              // if (count < 4) {
              //   setDisplayItems(currDisplay => {
              //     return [...currDisplay, product.data];
              //   });
              // }
              // count++;
            });
        }
      })
      .catch(err => console.log(err));
  }, [productId]);

  const changeDisplay = (direction) => {
    console.log('clicked')
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

    // console.log(relatedItems)
    // if (direction === 'left' && startIndex > 0) {
    //   let toDisplay = [];
    //   for (let i = startIndex - 1; i < startIndex + 3; i++) {
    //     toDisplay.push(relatedItems[i]);
    //   }
    //   setStartIndex(startIndex - 1);
    //   setDisplayItems(toDisplay);
    // }
    // if (direction === 'right' && startIndex + 4 <= relatedItems.length - 1) {
    //   let toDisplay = [];
    //   for (let i = startIndex + 1; i < startIndex + 5; i++) {
    //     toDisplay.push(relatedItems[i]);
    //   }
    //   setStartIndex(startIndex + 1);
    //   setDisplayItems(toDisplay);
    // }
  };

  return (
    <div className="card-container-container">
      <i className="fa-solid fa-arrow-left-long cards-arrow" onClick={() => { changeDisplay('left'); }}/>
      <div id="card-container-related">
        {relatedItems.map((item) => {
          return (
            <RelatedItemsCard
              key={item.id}
              item={item}
              calcRating={calcRating}
              saleAndImageSetter={saleAndImageSetter}
              renderPrice={renderPrice}
              updateProduct={updateProduct}
              currProductId={productId}
            />
          );
        })}
      </div>
      <i className="fa-solid fa-arrow-right-long cards-arrow" onClick={() => { changeDisplay('right'); }}/>
    </div>
  );
};


export default RelatedItems;