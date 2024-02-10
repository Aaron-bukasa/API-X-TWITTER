const express = require("express");

exports.index = (req, res, next) => {
    res.send("Page d'accueil: Liste des tweets");
}

// Liste tweet
exports.tweet_list = (req, res, next) => {
    res.send("La page n'est pas disponible: Liste des tweets");
}

// Detail tweet specific
exports.tweet_detail = (req, res, next) => {
    res.send("la page n'est pas disponible: Tweet detail")
}

// Create tweet
exports.tweet_create_get = (req, res, next) => {
    res.send("la page n'est pas disponible: Creer un Tweet GET")
}
exports.tweet_create_post = (req, res, next) => {
    res.send("la page n'est pas disponible: Creer un Tweet Post")
}

// Delete tweet
exports.tweet_delete_get = (req, res, next) => {
    res.send("la page n'est pas disponible: Supprimer un Tweet GET")
}
exports.tweet_delete_post = (req, res, next) => {
    res.send("la page n'est pas disponible: Supprimer un Tweet Post")
}

// Update tweet
exports.tweet_update_get = (req, res, next) => {
    res.send("la page n'est pas disponible: Mettre à jour Tweet GET")
}
exports.tweet_update_post = (req, res, next) => {
    res.send("la page n'est pas disponible: Mettre à jour Tweet GET")
}