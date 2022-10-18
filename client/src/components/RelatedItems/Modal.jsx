import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
};

const Modal = ({ open, onClose, productId, compareId, compareProduct, children }) => {
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
        compare.push(currCharacteristics[field].value);
      } else {
        compare.push('');
      }

      compare.push(field);

      if (compareCharacteristics.hasOwnProperty(field)) {
        compare.push(compareCharacteristics[field].value);
      } else {
        compare.push('');
      }
      comparisons.push(compare);
    }

    return comparisons.map(entry => {
      return (
        <tr>
          <td className="modal-curr-product">{entry[0]}</td>
          <td className="modal-field-name">{entry[1]}</td>
          <td className="modal-compare-product">{entry[2]}</td>
          <br></br>
        </tr>
      );
    });
  };


  if (!open) {
    return null;
  }
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose}></div>
      <div style={MODAL_STYLES} onClick={(event) => event.stopPropagation()}>
        <table>
          <tr>
            <td>{currName}</td>
            <td></td>
            <td>{compareName}</td>
          </tr>
          {currCharacteristics && compareCharacteristics && buildRows()}
        </table>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default Modal;