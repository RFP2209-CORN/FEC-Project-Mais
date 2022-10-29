import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComparisonModal from './ComparisonModal.jsx';
import StarRating from '../Ratings&Reviews/Ratings/StarRating.jsx';

const RelatedItemsCard = ({ item, calcRating, saleAndImageSetter, renderPrice, updateProduct, currProductId, currentProduct }) => {
  const [product, setProduct] = useState(item);
  const [rating, setRating] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [salesPrice, setSalesPrice] = useState(null);
  const [imgURL, setImgURL] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [compareId, setCompareId] = useState();

  useEffect(() => {
    axios.get(`/reviews/meta/${product.id}`)
      .then(result => {
        let reviews = result.data.ratings;
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

  const renderModal = (event, productId) => {
    event.stopPropagation();
    setIsOpen(true);
    setCompareId(productId);
  };

  const closeModal = (event) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div className="card card-shadow related-items-card" value={product.id} onClick={() => updateProduct(event, product.id)}>
      <i className="fa-solid fa-star favorite-icon star-icon" onClick={(event) => { renderModal(event, product.id); }}></i>
      {isOpen === true &&
        <ComparisonModal
          open={isOpen}
          onClose={closeModal}
          productId={currProductId}
          compareId={compareId}
          compareProduct={product}
          currentProduct={currentProduct}
        >
        </ComparisonModal>
      }
      <div className="card-image">
        {imgURL === null && <div className="out-of-stock-related-image"/>}
        {imgURL && <img src={imgURL} />}
      </div>
      <p className="card-category">{item.category}</p>
      <div className="card-name">{item.name}</div>
      {renderPrice(salesPrice, originalPrice)}
      <div className="card-rating overall-stars"><StarRating rating={rating} /></div>
    </div>
  );
};

export default RelatedItemsCard;