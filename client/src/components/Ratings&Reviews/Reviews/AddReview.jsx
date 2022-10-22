import React, { useState } from 'react';
import AddReviewModal from './AddReviewModal.jsx';

const AddReview = ({ prodName, handleSubmit, metaData }) => {

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

    <AddReviewModal open={isOpen} onClose={closeModal} prodName={prodName} handleSubmit={handleSubmit} metaData={metaData} />

    </>
  )
}

export default AddReview;
