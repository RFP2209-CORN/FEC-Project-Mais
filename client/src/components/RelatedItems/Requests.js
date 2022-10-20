import axios from 'axios';

export const getProductReviews = (productId) => {
  return (
    axios.get(`/reviews/${productId}`)
      .then(result => result.data.results)
  )
};

export const getProductStyles = (productId) => {
  return (
    axios.get(`/products/${productId}/styles`)
      .then(result => result.data.results)
  )
}