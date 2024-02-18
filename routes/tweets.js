const express = require('express');
const router = express.Router();

// import controller module
const tweets_controller = require("../controllers/tweetsController");

/// TWEET ROUTES ///

// Display Home page, one tweet and all tweet
router.get("/", tweets_controller.tweet_list);
router.get("/:id", tweets_controller.tweet_detail);

// create, delete and update a tweet
router.post("/", tweets_controller.tweet_create);
router.delete("/:id", tweets_controller.tweet_delete);
router.put("/:id", tweets_controller.tweet_update);

// Increment(decrement) likes et retweets
router.put("/:id/likes", tweets_controller.tweet_likesUpdate);
router.put("/:id/retweets", tweets_controller.tweet_retweetsUpdate);

module.exports = router;