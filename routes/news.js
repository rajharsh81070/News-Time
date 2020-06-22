const router = require('express').Router();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('d2c71452ccd74a0b85906eeef9426f37');

router.get('/', (req, res) => {
  newsapi.v2.topHeadlines({
    language: 'en',
    country: 'in'
  })
    .then(response => {
      res.json(response);
    })
    .catch((e) => {
      console.log(e)
    })
});

module.exports = router;