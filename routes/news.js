const router = require('express').Router();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('d2c71452ccd74a0b85906eeef9426f37');

router.get('/topheadlines', (req, res) => {
  // console.log(req.query);
  newsapi.v2.topHeadlines({
    language: req.query.language,
    country: req.query.country,
    category: req.query.category,
    sources: req.query.sources,
    q: req.query.q,
    pageSize: 100
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
    qInTitle: req.query.qInTitle,
    sources: req.query.sources,
    domains: req.query.domains,
    from: req.query.from,
    to: req.query.to,
    language: req.query.language,
    sortBy: req.query.sortBy,
    pageSize: 100
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
      // console.log(response.sources.length)
      res.json(response);
    })
    .catch((e) => {
      console.log(e)
    });
});

module.exports = router;