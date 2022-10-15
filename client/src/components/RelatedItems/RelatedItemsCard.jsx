import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RelatedItemsCard = ({ item, calcRating, saleAndImageSetter, renderPrice }) => {
  const [product, setProduct] = useState(item);
  const [rating, setRating] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [salesPrice, setSalesPrice] = useState(null);
  const [imgURL, setImgURL] = useState();

  useEffect(() => {
    axios.get(`/reviews/${product.id}`)
      .then(result => {
        let reviews = result.data.results;
        setRating(calcRating(reviews));
      });

    axios.get(`/products/${product.id}/styles`)
      .then(result => {
        let styles = result.data.results;
        const { sale, ogPrice, thumbnailURL } = saleAndImageSetter(styles);

        setOriginalPrice(ogPrice);
        setSalesPrice(sale);
        setImgURL(thumbnailURL);
      });
  }, []);



  return (
    <div className="card-container">
      <img src={imgURL}/>
      <div>category {item.category}</div>
      <div>product name {item.name}</div>
      {renderPrice(salesPrice, originalPrice)}
      <div>star rating {rating}</div>
    </div>
  );
};

export default RelatedItemsCard;