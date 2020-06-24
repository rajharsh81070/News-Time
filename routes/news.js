const router = require('express').Router();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('d2c71452ccd74a0b85906eeef9426f37');

router.get('/topheadlines', (req, res) => {
  newsapi.v2.topHeadlines({
    language: req.query.language,
    country: req.query.country,
    category: req.query.category,
    sources: req.query.sources,
    q: req.query.q,
    page: req.query.page
  })
    .then(response => {
      res.json(response);
    })
    .catch((e) => {
      console.log(e)
    });
});

router.get('/everything', (req, res) => {
  newsapi.v2.everything({
    q: req.query.q,
    sources: req.query.sources,
    domains: req.query.domains,
    from: req.query.from,
    to: req.query.to,
    language: req.query.language,
    sortBy: req.query.sortBy,
    page: req.query.page
  })
    .then(response => {
      res.json(response);
    })
    .catch((e) => {
      console.log(e)
    });
});

router.get('/sources', (req, res) => {
  newsapi.v2.sources({
    category: req.query.category,
    language: req.query.language,
    country: req.query.country,
  })
    .then(response => {
      console.log(response.sources.length)
      res.json(response);
    })
    .catch((e) => {
      console.log(e)
    });
});

module.exports = router;