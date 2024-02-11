const express = require("express");
const { body,validationResult } = require("express-validator");
const { escape } = require("querystring");

let tweet = [
    {   
        userId: 1,
        id: 1,
        title: "Aaron",
        likes: 72,
        isLikes: false,
        retweets: 122,
        isRetweets: false,
        texte: "ex deo nascimur in christo morimur per spiritum sanctum reviviscimus",
        imgTweet: "https://picsum.photos/200?random=1609942590000"
    },
    {
        userId: 2,
        id: 2,
        title: "Ardev",
        likes: 12,
        isLikes: false,
        retweets: 81,
        isRetweets: false,
        texte: "Aller plus haut",
        imgTweet: "https://picsum.photos/200?random=1604299903000"
    }
];

exports.index = (req, res, next) => {
    res.send("Page d'accueil");
}

// Liste tweet
exports.tweet_list = (req, res, next) => {
    res.send(tweet);
}

// Detail tweet specific
exports.tweet_detail = (req, res, next) => {
    let tweetDetail = tweet.filter((element) => element.id == req.params.id)
    res.send(tweetDetail)
}

// Create tweet
exports.tweet_create = [
    body("title")
        .trim()
        .escape(),
    body('likes')
        .trim()
        .isNumeric()
        .escape(),
    
    (req, res, next) => {

        const errors = validationResult(req);

        const newTweet = {
            userId: req.body.userId,
            id: req.body.id,
            title: req.body.title,
            likes: req.body.likes,
            isLikes: false,
            retweets: req.body.retweets,
            isRetweets: false,
            texte: req.body.texte,
            imgTweet: req.body.texte
        }

        if(!errors.isEmpty()) {
            res.send({
                errors: errors.array()
            });
            return;
        } else {
            tweet.push(newTweet)
            res.send(tweet)
        }
    } 
]

// Delete tweet
exports.tweet_delete = (req, res, next) => {
    let index = tweet.indexOf(tweet.find((element) => element.id == req.params.id));
    let tweetDelete = tweet.splice(index, 1);
    res.send(tweet);
}

// Update tweet
exports.tweet_update = (req, res, next) => {
    let tweetUpdate = tweet.find((element) => element.id == req.params.id);
    
    const newTweet = {
        userId: req.body.userId,
        id: req.body.id,
        title: req.body.title,
        likes: req.body.likes,
        isLikes: false,
        retweets: req.body.retweets,
        isRetweets: false,
        texte: req.body.texte,
        imgTweet: req.body.texte
    }

    tweetUpdate.id = newTweet.id;
    tweetUpdate.title = newTweet.title;
    tweetUpdate.likes = newTweet.likes;
    tweetUpdate.isLikes = newTweet.isLikes;
    tweetUpdate.retweets = newTweet.retweets;
    tweetUpdate.isRetweets = newTweet.isRetweets;
    tweetUpdate.texte = newTweet.texte;

    res.send(tweet)
}

// Likes Tweet
exports.tweet_likesUpdate = (req, res, next) => {
    let tweetLikes = tweet.find((element) => element.id == req.params.id);
    tweetLikes.isLikes === true ? tweetLikes.isLikes = false : tweetLikes.isLikes = true;
    tweetLikes.isLikes === true ? tweetLikes.likes = tweetLikes.likes + 1 : tweetLikes.likes = tweetLikes.likes - 1;
    res.send(tweet)
}

// Retweets
exports.tweet_retweetsUpdate = (req, res, next) => {
    let tweetRetweets = tweet.find((element) => element.id == req.params.id);
    tweetRetweets.isRetweets === true ? tweetRetweets.isRetweets = false : tweetRetweets.isRetweets = true;
    tweetRetweets.isRetweets === true ? tweetRetweets.retweets = tweetRetweets.retweets + 1 : tweetRetweets.retweets = tweetRetweets.retweets - 1;
    res.send(tweet)
}