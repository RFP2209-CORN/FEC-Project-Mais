import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OutfitCard = ({ outfit }) => {
  const [product, setProduct] = useState(outfit);
  const [rating, setRating] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [salesPrice, setSalesPrice] = useState(null);
  const [onSale, setOnSale] = useState(false);
  const [imgURL, setImgURL] = useState();

  // Need to abstract this function or Scott's function to App
  // need to determine how to round
  const calcRating = (reviews) => {
    let totalStars = 0;

    for (let i = 0; i < reviews.length; i++) {
      totalStars += reviews[i].rating;
    }
    let rating = totalStars / reviews.length;
    let floor = Math.floor(rating);
    let decimal = rating - floor;

    if (decimal <= .25) {
      setRating(floor);
    } else if (decimal <= .5) {
      setRating(floor + .25);
    } else if (decimal <= .75) {
      setRating(floor + .5);
    } else {
      setRating(floor + .75);
    }
  };
  const renderPrice = () => {
    if (onSale) {
      return (
        <p>
          <br></br>
          <span style={{textDecoration: 'line-through red'}}>{originalPrice}</span>
          <br></br>
          <span style={{color: 'red'}}>{salesPrice}</span>
        </p>
      );
    } else {
      return (
        <p>{originalPrice}</p>
      );
    }
  };

  useEffect(() => {
    axios.get(`/reviews/${product.id}`)
      .then(result => {
        let reviews = result.data.results;
        calcRating(reviews);
      });

    axios.get(`/products/${product.id}/styles`)
      .then(result => {
        let styles = result.data.results;
        console.log('styles', styles)

        for (let i = 0; i < styles.length; i++) {
          if (styles[i]['default?'] === true) {
            if (styles[i].sale_price) {
              setOnSale(currBool => true);
              setSalesPrice(currSalesPrice => {
                return styles[i].sale_price;
              });
            } else {
              setOriginalPrice(currPrice => {
                return styles[i].original_price;
              });
            }
            setImgURL(currImg => {
              return styles[i].photos[0].thumbnail_url;
            });
          }
        }
      });
  }, []);

  return (
    <div>
      OutfitCard
      <img src={imgURL}/>
      <div>category {outfit.category}</div>
      <div>product name {outfit.name}</div>
      {renderPrice()}
      <div>star rating {rating}</div>
    </div>
  );
};

export default OutfitCard;