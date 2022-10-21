import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import StarRating from '../Ratings&Reviews/Ratings/StarRating.jsx';


const ComparisonModal = ({ open, onClose, productId, compareId, compareProduct, children }) => {
  const [currCharacteristics, setCurrCharacteristics] = useState();
  const [compareCharacteristics, setCompareCharacteristics] = useState();
  const [currName, setCurrName] = useState();
  const [compareName, setCompareName] = useState();

  useEffect(() => {
    axios.get(`/reviews/meta/${productId}`)
      .then(result => {
        setCurrCharacteristics(result.data.characteristics);
      });
    axios.get(`/reviews/meta/${compareId}`)
      .then(result => {
        setCompareCharacteristics(result.data.characteristics);
      });
    axios.get(`/products/${productId}`)
      .then(result => {
        setCurrName(result.data.name);
        setCompareName(compareProduct.name);
      });
  }, []);

  const buildRows = () => {
    let characteristics = [];
    let comparisons = [];

    for (let field in currCharacteristics) {
      if (!characteristics.includes(field)) {
        characteristics.push(field);
      }
    }
    for (let field in compareCharacteristics) {
      if (!characteristics.includes(field)) {
        characteristics.push(field);
      }
    }

    for (let field of characteristics) {
      let compare = [];

      if (currCharacteristics.hasOwnProperty(field)) {
        compare.push(Number.parseFloat(currCharacteristics[field].value).toFixed(1));
      } else {
        compare.push('');
      }

      compare.push(field);

      if (compareCharacteristics.hasOwnProperty(field)) {
        compare.push(Number.parseFloat(compareCharacteristics[field].value).toFixed(1));
      } else {
        compare.push('');
      }
      comparisons.push(compare);
    }

    return comparisons.map(entry => {
      return (
        <tr key={entry}>
          <td className="modal-curr-product">
            {entry[0] > 0 && <StarRating rating={entry[0]}/>}

          </td>
          <td className="modal-field-name">
            {entry[1]}
          </td>
          <td className="modal-compare-product">
          {entry[2] > 0 && <StarRating rating={entry[2]}/>}
          </td>
        </tr>
      );
    });
  };


  if (!open) {
    return null;
  }
  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" onClick={onClose}></div>
      <div className="modal-styles comparison-modal">
        <button className="close-modal-btn" onClick={onClose}>X</button>
          <table  onClick={(event) => event.stopPropagation()}>
            <tbody>
              <tr>
                <td className="comparison-modal-name">{currName}</td>
                <td></td>
                <td className="comparison-modal-name">{compareName}</td>
              </tr>
              {currCharacteristics && compareCharacteristics && buildRows()}
            </tbody>
          </table>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default ComparisonModal;