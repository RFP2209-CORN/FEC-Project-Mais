import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RelatedItems = ({productId}) => {
  const [relatedItems, setRelatedItems] = useState([])

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/related`, {
      headers: {Authorization: process.env.GITHUB_API_KEY},
    })
      .then(result => {
        console.log(result);

        for (let id of result.data) {
          axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`, {
            headers: {Authorization: process.env.GITHUB_API_KEY},
          })
            .then(result =>
              setRelatedItems(currProducts => {
                return [...currProducts, result.data]
              }
            ))
        }
      })
      .catch(err => console.log(err))
  }, [])


  return (
    <div>
      Related Items
    </div>
  )
}


export default RelatedItems;