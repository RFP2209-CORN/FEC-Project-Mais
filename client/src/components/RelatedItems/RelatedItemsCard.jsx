import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RelatedItemsCard = ({ item, calcRating, saleAndImageSetter }) => {
  const [product, setProduct] = useState(item);
  const [rating, setRating] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [salesPrice, setSalesPrice] = useState(null);
  // const [price, setPrice] = useState(null);
  const [imgURL, setImgURL] = useState();

  // const saleAndImageSetter = (styles) => {
  //   for (let i = 0; i < styles.length; i++) {
  //     if (styles[i]['default?'] === true) {
  //       return {
  //         sale: styles[i].sale_price,
  //         ogPrice: styles[i].original_price,
  //         thumbnailURL: styles[i].photos[0].thumbnail_url
  //       };
  //     }
  //   }
  //   // if we get here, there wasn't a default style
  //   return {
  //     sale: styles[0].sale_price,
  //     ogPrice: styles[0].original_price,
  //     thumbnailURL: styles[0].photos[0].thumbnail_url
  //   };
  // };

  const renderPrice = () => {
    if (salesPrice) {
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
        setRating(calcRating(reviews))
        // calcRating(reviews);
      });

    axios.get(`/products/${product.id}/styles`)
      .then(result => {
        let styles = result.data.results;

        const { sale, ogPrice, thumbnailURL } = saleAndImageSetter(styles)

        setOriginalPrice(ogPrice);
        setSalesPrice(sale);
        setImgURL(thumbnailURL);

        // for (let i = 0; i < styles.length; i++) {
        //   if (styles[i]['default?'] === true) {
        //     setPrice(currStyle => {
        //       return styles[i].original_price;
        //     });
        //     setImgURL(currImg => {
        //       return styles[i].photos[0].thumbnail_url;
        //     });
        //   }
        // }
      });
  }, []);



  return (
    <div className="card-container">
      <img src={imgURL}/>
      <div>category {item.category}</div>
      <div>product name {item.name}</div>
      {renderPrice()}
      {/* <div>price {price !== null && price}</div>
      <div>price {price === null && item.default_price}</div> */}
      <div>star rating {rating}</div>
    </div>
  );
};

export default RelatedItemsCard;