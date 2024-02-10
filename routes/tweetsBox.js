const express = require('express');
const router = express.Router();

// import controller module
const tweet_controller = require("../controllers/tweetController");

/// TWEET ROUTES ///

// Get tweetsbox page d'accueil
router.get("/", tweet_controller.index);

// Requette GET et POST SUR la creation d'un tweet
router.get("/tweet/create", tweet_controller.tweet_create_get);
router.get("/tweet/create", tweet_controller.tweet_create_post);

// Requette GET et POST SUR la suppression d'un tweet
router.get("/tweet/:id/delete", tweet_controller.tweet_delete_get);
router.get("/tweet/:id/delete", tweet_controller.tweet_delete_post);

// Requette GET et POST SUR la mise à jour d'un tweet
router.get("/tweet/:id/update", tweet_controller.tweet_update_get);
router.get("/tweet/:id/update", tweet_controller.tweet_update_post);

// Requette GET sur un tweet
router.get("/tweet/:id", tweet_controller.tweet_detail);

// Requette GET sur tous les tweet
router.get("/tweet", tweet_controller.tweet_list);

module.exports = router;