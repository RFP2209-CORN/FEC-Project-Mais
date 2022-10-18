import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItemsCard from './RelatedItemsCard.jsx';

const RelatedItems = ({ productId, calcRating, saleAndImageSetter, renderPrice, updateProduct }) => {
  const [relatedItems, setRelatedItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);

  // we want to display 4 items at a time
  // we could have a state to manage what to display which is a subsection of relatedItems
  // instead of mapping through relatedItems, we would map through displayItems

  const changeDisplay = (direction) => {
    // if direction is left, check if we can render prev item and update displayItems accordingly
    console.log('changing display', direction)
  }


  useEffect(() => {
    setRelatedItems([]);
    setDisplayItems([]);
    axios.get(`/products/${productId}/related`)
      .then(relatedProducts => {
        let count = 0;
        for (let id of relatedProducts.data) {
          axios.get(`/products/${id}`)
            .then(product => {
              setRelatedItems(currProducts => {
                return [...currProducts, product.data];
              });
              console.log(count)
              if (count < 4) {
                console.log('should be setting display')
                setDisplayItems(currDisplay => {
                  return [...currDisplay, product.data]
                })
              } else {console.log('conditional not working')}
              count++
            });
        }

        // setDisplayItems(currDisplay => {
        //   return relatedProducts.slice(0, 4)
        // })
      })
      .catch(err => console.log(err));
  }, [productId]);

  return (
    <div className="card-container">
      <button onClick={() => {
        changeDisplay('left')
      }}>Left arrow</button>
      {displayItems.map((item) => {
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
      <button onClick={() => {
        changeDisplay('right')
      }}>Right arrow</button>
    </div>
  );
};


export default RelatedItems;