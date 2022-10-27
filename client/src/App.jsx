import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './components/Overview/Overview.jsx';
import QuestionsAndAnswers from './components/Q&A/QA.jsx';
import RelatedItemsAndOutfits from './components/RelatedItems/RelatedItemsAndOutfits.jsx';
import RatingsAndReviews from './components/Ratings&Reviews/Ratings&Reviews.jsx';
import { useTrackerUpdate } from './TrackerProvider.jsx';

const App = () => {
  const [productId, setProductId] = useState(40344);
  const trackClicks = useTrackerUpdate();
  const [currentProduct, setCurrentProduct] = useState({});
  const [rating, setRating] = useState(0);
  const [ratingsData, setRatingsData] = useState([]);
  const [images, setImages] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);

  const updateProduct = (e, prodId) => {
    setProductId(prodId);
  };

  // Testing Purpose ONLY ---- COMMENT OUT WHEN NOT TESTING //
  // const cloudinary = {
  //   createUploadWidget: () => { return null; }
  // };

  // Online Photo Upload Support
  const photoWidget = cloudinary.createUploadWidget(
    {
      cloudName: 'dqk77sezi',
      uploadPreset: 'FEC-add-photo'
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('done! Here is the image info: ', result.info);
        setImages([...images, result.info.url]);
      }
      if (error) { console.log(error); }
    }
  );

  // Renders Everything needed for other widget to use
  useEffect(() => {
    const modules = ['relatedItemsAndOutfits', 'overview', 'qa', 'rateAndReview'];

    const listeners = modules.map(module => {
      let elem = document.getElementById(module);
      elem.addEventListener('click', trackClicks);
    });

    // Determine unique user
    let uniqueUser = localStorage.getItem(document.cookie);
    uniqueUser = JSON.parse(uniqueUser);
    if (uniqueUser.cookie !== document.cookie) {
      console.log('user is not the same');
      localStorage.setItem(`${document.cookie}`, JSON.stringify({ cookie: document.cookie }));
    } else {
      console.log('same user');
    }
  }, []);

  // Re-render everytime ProductId changes
  useEffect(() => {
    // Single Product
    axios.get(`/products/${productId}`)
      .then(result => setCurrentProduct(result.data))
      .catch(err => console.log(err));

    // Ratings Metadata
    axios.get(`/reviews/meta/${productId}`)
      .then(results => {
        let ratings = results.data.ratings;
        let rating = 0;
        let total = 0;
        for (let key in ratings) {
          total += Number(ratings[key]);
          rating += Number(key) * Number(ratings[key]);
        }
        rating = (Math.round((rating / total) * 4) / 4);
        setRating(rating);
        setTotalReviews(total);
        setRatingsData(ratings);
      })
      .catch(err => console.log(err));
  }, [productId]);

  return (
    <div id="body">
      <div id="overview">
        <Overview productId={productId} currentProduct={currentProduct} rating={rating} totalReviews={totalReviews} />
      </div>

      <div id="relatedItemsAndOutfits">
        <RelatedItemsAndOutfits productId={productId} updateProduct={updateProduct} currentProduct={currentProduct} />
      </div>

      <div id="qa">
        <QuestionsAndAnswers productId={productId} productName={currentProduct.name} photoWidget={photoWidget} images={images} setImages={setImages} />
      </div>

      <div id="rateAndReview">
        <RatingsAndReviews product_id={productId} ratingsData={ratingsData} rating={rating} currentProduct={currentProduct} totalReviews={totalReviews} />
      </div>
    </div>
  );
};

export default App;