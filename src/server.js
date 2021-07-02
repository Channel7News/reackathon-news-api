const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.status(200).json({
    "Hi": "Welcome to the Channel 7 News API"
  });
});

router.get("/everything/:query", (req, res) => {
  const searchValue = req.params.query;
  fetch(
    `https://newsapi.org/v2/everything?q=${searchValue}&apiKey=4528ed13b69744e581384c6fa39e00de`
  )
    .then((response) => response.json())
});

router.get("/headlines/:category/:countryCode", (req, res) => {
  const category = req.params.category;
  const countryCode = req.params.countryCode;
  fetch(
    `https://newsapi.org/v2/top-headlines?category=${category}&country=${countryCode}&apiKey=4528ed13b69744e581384c6fa39e00de`
  )
    .then((response) => response.json())
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
