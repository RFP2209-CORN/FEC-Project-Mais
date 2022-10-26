import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItemsCard from './RelatedItemsCard.jsx';

const RelatedItems = ({ productId, calcRating, saleAndImageSetter, renderPrice, updateProduct }) => {
  const [relatedItems, setRelatedItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setRelatedItems([]);
    axios.get(`/products/${productId}/related`)
      .then(relatedProducts => {
        for (let id of relatedProducts.data) {
          axios.get(`/products/${id}`)
            .then(product => {
              setRelatedItems(currProducts => {
                return [...currProducts, product.data];
              });
            });
        }
      })
      .catch(err => console.log(err));
  }, [productId]);

  const changeDisplay = (direction) => {
    if (direction === 'left' && startIndex > 0) {
      setStartIndex(startIndex - 1);
      document.getElementById('card-container-related').scrollBy(-255, 0);
    }
    if (direction === 'right' && startIndex + 4 <= relatedItems.length - 1) {
      setStartIndex(startIndex + 1);
      document.getElementById('card-container-related').scrollBy(255, 0);
    }
  };

  const renderBlankCards = (relatedItmesLength) => {
    if (relatedItmesLength === 0) {
      return (
        <>
          <div className="card card-shadow"></div>
          <div className="card card-shadow"></div>
          <div className="card card-shadow"></div>
        </>
      );
    } else if (relatedItmesLength === 1) {
      return (
        <>
          <div className="card card-shadow"></div>
          <div className="card card-shadow"></div>
        </>
      );
    } else if (relatedItmesLength === 2) {
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
        {relatedItems.length <= 1 && renderBlankCards(relatedItems.length)}
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
      {relatedItems.length > 4 && <i className="fa-solid fa-arrow-right-long cards-arrow" onClick={() => { changeDisplay('right'); }}/>}
    </div>
  );
};


export default RelatedItems;