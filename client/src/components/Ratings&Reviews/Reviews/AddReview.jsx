import React, { useState } from 'react';
import AddReviewModal from './AddReviewModal.jsx';

const AddReviewButton = ({ product_id, prodName, addReview, metaData }) => {

  const [ isOpen, setIsOpen ] = useState(false);

  const closeModal = (event) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  const onAddReviewClick = () => {
    console.log('Add Review button clicked')
    setIsOpen(true);
  }

  return (
    <>
    <button onClick={onAddReviewClick} className="btn-add-review">
      Add Review
    </button>

    <AddReviewModal open={isOpen} onClose={closeModal} product_id={product_id} prodName={prodName} addReview={addReview} metaData={metaData} />

    </>
  )
}

export default AddReviewButton;
