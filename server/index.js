require('dotenv').config();

const axios = require('axios');
const express = require('express');
const path = require('path');
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
const header = { headers: {Authorization: process.env.GITHUB_API_KEY} };

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./client/dist'));

//PRODUCTS

app.get('/products', (req, res) => {
  axios.get(`${url}/products/`, header)
    .then(result => res.status(200).send(result.data));
});

app.get('/products/:id', (req, res) => {
  axios.get(`${url}/products/${req.params.id}`, header)
    .then(result => res.status(200).send(result.data));
});

app.get('/products/:id/styles', (req, res) => {
  axios.get(`${url}/products/${req.params.id}/styles`, header)
    .then(result => res.status(200).send(result.data));
});

app.get('/products/:id/related', (req, res) => {
  axios.get(`${url}/products/${req.params.id}/related`, header)
    .then(result => res.status(200).send(result.data));
});

// REVIEWS
app.get('/reviews/:id', (req, res) => {
  axios.get(`${url}/reviews/?product_id=${req.params.id}`, header)
    .then(result => res.status(200).send(result.data));
});

app.get('/reviews/meta/:id', (req, res) => {
  axios.get(`${url}/reviews/meta/?product_id=${req.params.id}`, header)
    .then(result => res.status(200).send(result.data));
});

////TODO: BUILD OUT POST REQUEST
app.post('/reviews', (req, res) => {
  console.log(req.body)
  // {
  //   rating: 5,
  //   summary: 'it a summary',
  //   body: 'more writing',
  //   recommend: true,
  //   name: 'username',
  //   email: 'email address',
  //   photos: ['url1', 'url2'],
  //   characteristics: {"14": 5, "15": 5},
  // }

  axios.post(`${url}/reviews`, req.body, header)
    .then(result => res.end())
});

// Q&A
app.get('/qa/questions/:id', (req, res) => {
  axios.get(`${url}/qa/questions/?product_id=${req.params.id}`, header)
    .then(result => res.status(200).send(result.data));
});

/////endpoint not working
app.get('/qa/questions/:id/answers', (req, res) => {
  axios.get(`${url}/qa/questions/${req.params.id}/answers`, header)
    .then(result => res.status(200).send(result.data));
});


// CART
app.get('/cart', (req, res) => {
  axios.get(`${url}/cart`, header)
    .then(result => res.status(200).send(result.data));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);