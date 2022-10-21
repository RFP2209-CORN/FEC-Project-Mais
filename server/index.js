require('dotenv').config();

const axios = require('axios');
const express = require('express');
const path = require('path');
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
const header = { headers: { Authorization: process.env.GITHUB_API_KEY } };

// const header1 = { 'Authorization': process.env.GITHUB_API_KEY }
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./client/dist'));

//PRODUCTS
app.get('/products', (req, res) => {
  axios.get(`${url}/products/?count=50`, header)
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

app.post('/reviews', (req, res) => {
  console.log('req.body', req.body)
  axios.post(`${url}/reviews`, req.body, header)
    .then((result) => {
      console.log('result', result);
      res.sendStatus(201)
    })
    .catch((error) => {
      console.log(error);
      console.log('error.response.data', error.response.data)
      res.sendStatus(404);
    })
});

/* -------------------------------------------------- */
/*  QUESTIONS & ANSWERS  */
// GET all questions data
app.get('/qa/questions/:id', (req, res) => {
  axios.get(`${url}/qa/questions?product_id=${req.params.id}&page=1&count=1000`, header)
    .then(result => res.status(200).send(result.data));
});
// GET all answers data
app.get('/qa/questions/:id/answers', (req, res) => {
  axios.get(`${url}/qa/questions/${req.params.id}/answers`, header)
    .then(result => res.status(200).send(result.data));
});

// POST
// req.body obj - body, name, product_id, email
app.post('/qa/questions', (req, res) => {
  axios.post(`${url}/qa/questions`, req.body, header)
    .then(result => res.status(201).end())
    .catch(err => console.log(err));
});

// need the question_id when posted, req.body obj - body, name, email, photo
app.post('/qa/questions/:id/answers', (req, res) => {
  axios.post(`${url}/qa/questions/${req.params.id}/answers`, req.body, header)
    .then(result => res.status(201).end())
    .catch(err => console.log(err));
});

// PUT
// req.body - question_id
app.put('/qa/questions/:id/helpful', (req, res) => {
  const params = { question_id: req.params.id };
  axios.put(`${url}/qa/questions/${req.params.id}/helpful`, params, header)
    .then(result => res.status(204).end())
    .catch(err => console.log(err));
});

// req.body - question_id
app.put('/qa/questions/:id/report', (req, res) => {
  axios.put(`${url}/qa/questions/${req.params.id}/report`, req.body, header)
    .then(result => res.status(204).end())
    .catch(err => console.log(err));
});

// req.body - answer_id
app.put('/qa/answers/:id/helpful', (req, res) => {
  const params = { answer_id: req.params.id };
  axios.put(`${url}/qa/answers/${req.params.id}/helpful`, params, header)
    .then(result => res.status(204).end())
    .catch(err => console.log(err));
});

// req.body - answer_id
app.put('/qa/answers/:id/report', (req, res) => {
  axios.put(`${url}/qa/answers/${req.params.id}/report`, req.body, header)
    .then(result => res.status(204).end())
    .catch(err => console.log(err));
});

/* -------------------------------------------------- */
// CART
app.get('/cart', (req, res) => {
  axios.get(`${url}/cart`, header)
    .then(result => res.status(200).send(result.data));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);