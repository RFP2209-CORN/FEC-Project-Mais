import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import RatingsBreakdownSidebar from './Ratings/RatingsBreakdownSidebar.jsx';
import AddReview from './Reviews/AddReview.jsx';
import ReviewsList from './Reviews/ReviewsList.jsx';

const RatingsAndReviews = ({ product_id }) => {

  const [ reviews, setReviews ] = useState([]);
  const [ rating, setRating ] = useState(0.0);
  const [ fiveStar, setFiveStar ] = useState(0);
  const [ fourStar, setFourStar ] = useState(0);
  const [ threeStar, setThreeStar ] = useState(0);
  const [ twoStar, setTwoStar ] = useState(0);
  const [ oneStar, setOneStar ] = useState(0);
  const [ totalReviews, setTotalReviews ] = useState(0);

  const [ prodName, setProdName ] = useState('');
  const [ star, setStar ] = useState();
  const [ recommend, setRecommend ] = useState(false);
  const [ photos, setPhotos ] = useState([]);
  const [ characteristics, setCharacteristics ] = useState({});
  const [ modalIsOpen, setIsOpen ] = useState(false);

  const summaryRef = useRef();
  const bodyRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();


  let data = {
    product_id: 40344,
    rating: 5,
    summary: "good stuff",
    body: "good stuff...looking forward to using this product",
    recommend: true,
    name: "questionasker",
    email: "questionasker@email.com",
    photos: ["https://static.vecteezy.com/system/resources/thumbnails/001/189/165/small/star.png"],
    characteristics: {"14": 5, "15": 5}
  }

  useEffect(() => {
    product_id = 40344;
    axios.get(`/reviews/${product_id}`)
      .then((results) => {
        let productReviews = results.data.results;
        console.log('productReviews', productReviews);
        setReviews(productReviews);
        let totalRating = 0;
        productReviews.forEach((review) => {
          totalRating += review.rating;
        })
        let averageRating = totalRating / productReviews.length;
        averageRating = Math.round(averageRating * 10) / 10;
        setRating(averageRating);
        getMetaData();
        getProductName();
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  const getProductName = () => {
    product_id = 40344;
    axios.get(`/products/${product_id}`)
      .then((results) => {
        console.log('results.data from successful axios request to get product name', results.data);
        setProdName(results.data.name);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getMetaData = () => {
    // hardcoded product_id for now
    product_id = 40344;
    axios.get(`/reviews/meta/${product_id}`)
      .then((results) => {
        console.log('results.data from successful axios request to get meta data', results.data);
        let individualRatings = results.data.ratings;
        console.log('individualRatings', individualRatings);
        let total = 0;
        for (var key in individualRatings) {
          let ratings = parseInt(individualRatings[key]);
          total += ratings;
          key === '1' && setOneStar(ratings);
          key === '2' && setTwoStar(ratings);
          key === '3' && setThreeStar(ratings);
          key === '4' && setFourStar(ratings);
          key === '5' && setFiveStar(ratings);
        }
        setTotalReviews(total);
      })
  };

  const handleSubmit = () => {
     // hardcoded product_id for now
     product_id = 40344;
     data = {
       product_id: 40344,
       rating: 5,
       summary: "good stuff",
       body: "good stuff...looking forward to using this product",
       recommend: true,
       name: "questionasker",
       email: "questionasker@email.com",
       photos: ["https://static.vecteezy.com/system/resources/thumbnails/001/189/165/small/star.png"],
       characteristics: {"14": 5, "15": 5}
     }

     axios.post('/reviews', data)
       // product_id: product_id,
       // rating: rating,
       // summary: summaryRef,
       // body: bodyRef,
       // recommend: recommend,
       // name: usernameRef,
       // email: emailRef,
       // photos: photos,
       // characteristics: characteristics

       .then((response) => {
         console.log('response.data', response.data);
       })
       .catch((error) => {
         console.log('error', error);
       })
  }

  return (
    <>
    <div className="flexbox-container">
      <div className="sidebar">
        < RatingsBreakdownSidebar fiveStar={fiveStar} fourStar={fourStar} threeStar={threeStar} twoStar={twoStar} oneStar={oneStar} totalReviews={totalReviews} rating={rating} />
      </div>
      <ReviewsList totalReviews={totalReviews} reviews={reviews}/>
    </div>
    <AddReview prodName={prodName} handleSubmit={handleSubmit}/>
    </>
  );
}

export default RatingsAndReviews;