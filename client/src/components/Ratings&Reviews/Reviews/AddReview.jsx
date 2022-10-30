import React, { useState } from 'react';
import AddReviewModal from './AddReviewModal.jsx';

const AddReviewButton = ({ product_id, prodName, addReview, metaData, images, setImages, photoWidget }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = (event) => {
    event.stopPropagation();
    setImages([]);
    setIsOpen(false);
  };
  const onAddReviewClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button className="Add-Review" onClick={onAddReviewClick}>
        Add Review
        <AddReviewModal open={isOpen} onClose={closeModal} product_id={product_id} prodName={prodName} addReview={addReview} metaData={metaData} photoWidget={photoWidget} images={images} setImages={setImages} />
      </button>
    </>
  );
};

export default AddReviewButton;
