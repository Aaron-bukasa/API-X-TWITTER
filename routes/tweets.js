const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// import controller module
const tweets_controller = require("../controllers/tweetsController");

/// TWEET ROUTES ///

// Display Home page, one tweet and all tweet
router.get("/", auth, tweets_controller.tweet_list);
router.get("/:id", auth, tweets_controller.tweet_detail);

// create, delete and update a tweet
router.post("/", auth, tweets_controller.tweet_create);
router.delete("/:id", auth, tweets_controller.tweet_delete);
router.put("/:id", auth, tweets_controller.tweet_update);

// Increment(decrement) likes et retweets
router.put("/:id/likes", auth, tweets_controller.tweet_likesUpdate);
router.put("/:id/retweets", auth, tweets_controller.tweet_retweetsUpdate);

module.exports = router;