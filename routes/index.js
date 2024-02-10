const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/tweetBox")
  res.render('index', { title: 'API-X-TWITTER' });
});

module.exports = router;
