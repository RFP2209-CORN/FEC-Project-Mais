import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './components/Overview/Overview.jsx';
import QuestionsAndAnswers from './components/Q&A/QA.jsx';
import RelatedItemsAndOutfits from './components/RelatedItems/RelatedItemsAndOutfits.jsx';
import RatingsAndReviews from './components/Ratings&Reviews/Ratings&Reviews.jsx';
import { useTrackerUpdate } from './TrackerProvider.jsx';

const App = () => {
  const [productId, setProductId] = useState(40352);
  const trackClicks = useTrackerUpdate();
  const [currentProduct, setCurrentProduct] = useState({});
  const [rating, setRating] = useState(0);
  const [ratingsData, setRatingsData] = useState([]);
  const [images, setImages] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [metaData, setMetaData] = useState([]);

  const updateProduct = (e, prodId) => { setProductId(prodId); };

  const photoWidget = cloudinary.createUploadWidget(
    {
      cloudName: 'dqk77sezi',
      uploadPreset: 'FEC-add-photo'
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        setImages(prev => prev.length >= 5 ? prev : [...prev, result.info.url]);
      }
      if (error) { console.log(error); }
    }
  );

  // DARK THEME FLASHLIGHT MODE //
  const cursorPosition = (e) => {
    var x = e.clientX || e.touches[0].clientX;
    var y = e.clientY || e.touches[0].clientY;
    document.documentElement.style.setProperty('--cursorX', x + 'px');
    document.documentElement.style.setProperty('--cursorY', y + 'px');
  };
  document.addEventListener('mousemove', cursorPosition);
  document.addEventListener('touchmove', cursorPosition);

  useEffect(() => {
    // Click Tracker
    const modules = ['relatedItemsAndOutfits', 'overview', 'qa', 'rateAndReview'];

    const listeners = modules.map(module => {
      let elem = document.getElementById(module);
      elem.addEventListener('click', trackClicks);
    });

    //   // Determine unique user
    let uniqueUser = localStorage.getItem(document.cookie);
    uniqueUser = JSON.parse(uniqueUser);
    if (uniqueUser.cookie !== document.cookie) {
      console.log('user is not the same');
      localStorage.setItem(`${document.cookie}`, JSON.stringify({ cookie: document.cookie }));
    }
  }, []);

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
        setMetaData(results.data);
      })
      .catch(err => console.log(err));
  }, [productId]);

  return (
    // <div id="app-container" onMouseMove={cursorPosition}>
      <div id="app-container">
      <div id="banner">
        <div>
          <span>
            {/* <img className="logo" src="https://static.onecms.io/wp-content/uploads/sites/47/2022/09/15/can-cats-eat-candy-corn-3.png" /> */}
            <img className="logo" src="https://media.istockphoto.com/vectors/corn-cob-in-a-green-husk-isolated-on-white-background-sweet-golden-vector-id1208173277?k=20&m=1208173277&s=612x612&w=0&h=XFqTQ-8JTjptNr2j8Hdfc2df2bfrVq-UenUwVef-yCg=" />
          </span>&nbsp;
          <h1 className="company-name">ATELIER MAÏS</h1>
        </div>
        <div className="banner-icons">
          <i className="fa-solid fa-magnifying-glass"> _______________</i>&nbsp;&nbsp;
          <i className="fa-solid fa-house"></i>&nbsp;&nbsp;
          <i className="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;
          <i className="fa-solid fa-user"></i>&nbsp;&nbsp;
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>

      {/* <div id="overview">
        <Overview productId={productId} currentProduct={currentProduct} rating={rating} totalReviews={totalReviews} />
      </div> */}

      {/* <div id="relatedItemsAndOutfits">
        <RelatedItemsAndOutfits productId={productId} updateProduct={updateProduct} currentProduct={currentProduct} />
      </div> */}

      {/* <div id="qa">
        <QuestionsAndAnswers productId={productId} productName={currentProduct.name} photoWidget={photoWidget} images={images} setImages={setImages} />
      </div> */}

      <div id="rateAndReview">
        <RatingsAndReviews metaData={metaData} product_id={productId} ratingsData={ratingsData} rating={rating} currentProduct={currentProduct} totalReviews={totalReviews} photoWidget={photoWidget} images={images} setImages={setImages} />
      </div>
    </div>
  );
};

export default App;