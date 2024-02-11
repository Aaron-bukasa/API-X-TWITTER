const express = require("express");
const { body,validationResult } = require("express-validator");
const { escape } = require("querystring");

let tweet = [
    {
        id: 1,
        title: "Aaron",
        likes: 72,
        texte: "ex deo nascimur in christo morimur per spiritum sanctum reviviscimus"
    },
    {
        id: 2,
        title: "Ardev",
        likes: 12,
        texte: "Aller plus haut"
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
            id: req.body.id,
            title: req.body.title,
            likes: req.body.likes,
            texte: req.body.texte
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
    const [id, title, likes, textete] = tweetUpdate;

}