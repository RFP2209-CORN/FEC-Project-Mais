import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComparisonModal from './ComparisonModal.jsx';
import StarRating from '../Ratings&Reviews/Ratings/StarRating.jsx';

const RelatedItemsCard = ({ item, calcRating, saleAndImageSetter, renderPrice, updateProduct, currProductId }) => {
  const [product, setProduct] = useState(item);
  const [rating, setRating] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [salesPrice, setSalesPrice] = useState(null);
  const [imgURL, setImgURL] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [compareId, setCompareId] = useState();

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

  const renderModal = (event) => {
    event.stopPropagation();
    setIsOpen(true);
    setCompareId(event.target.value);
  };

  const closeModal = (event) => {
    event.stopPropagation();
    setIsOpen(false);
  };



  return (
    <div className="card card-shadow" value={product} onClick={() => updateProduct(event, product)}>
      <button
        className="favorite-icon"
        value={product.id}
        onClick={renderModal}>
        ⭐
      </button>
      {isOpen === true &&
        <ComparisonModal open={isOpen} onClose={closeModal} productId={currProductId} compareId={compareId} compareProduct={product}>
        </ComparisonModal>
      }
      <div className="card-image">
        {imgURL === null && <div className="no-image">Image not available</div>}
        {imgURL && <img src={imgURL}/>}
      </div>
      <p className="card-category">{item.category}</p>
      <div className="card-name">{item.name}</div>
      {renderPrice(salesPrice, originalPrice)}
      <div className="card-rating"><StarRating rating={rating}/></div>
    </div>
  );
};

export default RelatedItemsCard;