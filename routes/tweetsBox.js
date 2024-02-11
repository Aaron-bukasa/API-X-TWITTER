const express = require('express');
const router = express.Router();

// import controller module
const tweet_controller = require("../controllers/tweetController");

/// TWEET ROUTES ///

// Home page, one tweet and all tweet
router.get("/", tweet_controller.index);
router.get("/tweet/:id", tweet_controller.tweet_detail);
router.get("/tweet", tweet_controller.tweet_list);

// create, delete and update a tweet
router.post("/tweet", tweet_controller.tweet_create);
router.delete("/tweet/:id", tweet_controller.tweet_delete);
router.put("/tweet/:id", tweet_controller.tweet_update);

//increment(decrement) likes et retweets


module.exports = router;