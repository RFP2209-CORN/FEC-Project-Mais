import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItemsCard from './RelatedItemsCard.jsx'

const RelatedItems = ({ productId, calcRating, saleAndImageSetter, renderPrice }) => {
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="card-list">
      {relatedItems.map((item) => {
        return (
          <RelatedItemsCard
            key={item.id}
            item={item}
            calcRating={calcRating}
            saleAndImageSetter={saleAndImageSetter}
            renderPrice={renderPrice}
          />
        );
      })}
    </div>
  );
};


export default RelatedItems;