const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.tweet_list = async(req, res) => {
    try {
        const tweets = await prisma.tweet.findMany();
        res.json(tweets);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

exports.tweet_detail = async(req, res) => {
    const tweetId = parseInt(req.params.id);
    try {
        const tweet = await prisma.tweet.findUnique({
            where: { id: tweetId },
        });
        if(!tweet) {
            res.status(404).json({ error: 'Le tweet n\'existe pas' });
        } else {
            res.json(tweet);
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

// Create tweet
exports.tweet_create = async(req, res) => {
    try {
        const { contentTxt, contentImg } = req.body;
        if (!contentTxt && !contentImg) {
          return res.status(400).json({ error: 'Veillez renseigner au moins un champs: Le texte ou l\'image à publier' });
        }
    
        const newTweet = await prisma.tweet.create({
          data: {
            contentTxt,
            contentImg
          }
        });
    
        res.status(201).json(newTweet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    };
}

// Delete tweet
exports.tweet_delete = async(req, res) => {
    const { id } = req.params;
    try {
        const tweet = await prisma.tweet.delete({
            where: { id: Number(id) },
        })
        res.json(tweet)

    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

// Update tweet
exports.tweet_update = async(req, res) => {
    try {
        const tweetId = parseInt(req.params.id);
        const { contentTxt, contentImg } = req.body;
    
        if (!contentTxt && !contentImg) {
            return res.status(400).json({ error: 'Veillez renseigner au moins un champs: Le texte ou l\'image à publier' });
        }
    
        const updatedTweet = await prisma.tweet.update({
          where: { id: tweetId },
          data: { contentTxt, contentImg },
        });
    
        res.json(updatedTweet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

// Likes Tweet
exports.tweet_likesUpdate = async(req, res, next) => {
    try {
        const tweetId = parseInt(req.params.id);
    
        const updatedTweet = await prisma.tweet.update({
          where: { id: tweetId },
          data: {
            likes: {
              increment: 1,
            },
          },
        });
    
        res.json(updatedTweet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

// Retweets
exports.tweet_retweetsUpdate = async(req, res) => {
    try {
        const tweetId = parseInt(req.params.id);
    
        const updatedTweet = await prisma.tweet.update({
          where: { id: tweetId },
          data: {
            retweets: {
              increment: 1,
            },
          },
        });
    
        res.json(updatedTweet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
