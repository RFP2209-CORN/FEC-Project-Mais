import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItemsCard from './RelatedItemsCard.jsx';

const RelatedItems = ({ productId, calcRating, saleAndImageSetter, renderPrice, updateProduct }) => {
  const [relatedItems, setRelatedItems] = useState([]);

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

  return (
    <div className="card-container">
      {relatedItems.map((item) => {
        return (
          <RelatedItemsCard
            key={item.id}
            item={item}
            calcRating={calcRating}
            saleAndImageSetter={saleAndImageSetter}
            renderPrice={renderPrice}
            updateProduct={updateProduct}
          />
        );
      })}
    </div>
  );
};


export default RelatedItems;