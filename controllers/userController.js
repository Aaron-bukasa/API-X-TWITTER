const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const auth = require('../middleware/auth');
const router = express.Router();
const tweets_controller = require("../controllers/tweetsController");

exports.user_signup = async(req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            },
        });

        res.status(200).json({ message: 'Utilisateur créé', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Erreur serveur' });
    }
};


exports.user_login = async(req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
              email: req.body.email,
            },
        })

        if(user === null) {
            res.status(401).json({ message: 'Identifiant ou mot de pase incorect'})
        } else {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        res.status(401).json({ message: 'Identifant ou mot de passe incorect' })
                    } else {
                        res.status(200).json({
                            userId: user.id,
                            token: jwt.sign(
                                {userId: user.id},
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '24h' }
                            )
                        });
                    }
                })
                .catch(error => {
                    res.status(500).json({ error })
                })
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'Erreur serveur' });
    }
    
};