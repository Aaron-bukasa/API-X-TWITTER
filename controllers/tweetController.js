const express = require("express");
const { body, validationResult } = require("express-validator");

// ... autres routes

// Create tweet
exports.tweet_create_get = (req, res) => {
  // Afficher le formulaire de création de tweet
  res.render("create-tweet"); // En supposant que vous utilisez un moteur de templating
};

exports.tweet_create_post = [
  body("title", "Title must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("user", "User must not be empty")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("texte", "Texte must not be empty")
    .trim()
    .isLength({ min: 5 }) // Correction: "mion" à "min"
    .escape(),
  body("likes").escape(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Retourner les erreurs à la vue
      res.render("create-tweet", { errors: errors.array() });
      return;
    }

    // Créer le tweet
    const tweet = {
      title: req.body.title, // Correction: req.params à req.body
      user: req.body.user,
      texte: req.body.texte,
      likes: req.body.likes,
    };

    // Enregistrer le tweet (à remplacer par votre code de persistance)
    tweet.save()
      .then((savedTweet) => {
        res.redirect(`/tweets/${savedTweet.id}`); // Correction: redirection vers la page du tweet
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Erreur lors de la création du tweet");
      });
  },
];
