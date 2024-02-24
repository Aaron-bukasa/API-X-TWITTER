
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.user_signup = async(req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userWithProfil = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                profil: {
                    create: {
                        username: req.body.username,
                    },
                },
            },
            include: {
                profil: true,
            },
        });
        
        res.status(200).json({ message: 'Utilisateur créé', user: userWithProfil });
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

exports.userWithProfilGET = async(req, res) => {
    const userId = parseInt(req.params.id);
    try {
      const userWithProfil = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            profil: true,
        },
      });
      if(!userWithProfil) {
            res.status(404).json({ error: 'Le tweet n\'existe pas' });
        } else {
            res.json(userWithProfil);
        }
      
    res.status(200).json({ userWithProfil })
    } catch (error) {
      res.status(500).json({ error: error })
    }
}

exports.user_list = async(req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

// exports.user_detail = async(req, res) => {
//     const userId = parseInt(req.params.id);
//     try {
//         const user = await prisma.user.findUnique({
//             where: { id: userId },
//         });
//         if(!user) {
//             res.status(404).json({ error: 'L\'utilisateur n\'existe pas' });
//         } else {
//             res.json(user);
//         }
//     } catch(error) {
//         console.error(error);
//         res.status(500).json({ error: 'Erreur serveur' })
//     }
// }

exports.profil_detail = async(req, res) => {

    const userId = parseInt(req.params.id);

    const userWithProfil = await prisma.user.findUnique({
        where: { id: userId },
        include: { profil: true }
    });

    if (!userWithProfil) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(userWithProfil.profil);
}

// exports.profil_create = async(req, res) => {
//     const { userId } = req.params;
//     const { bio } = req.body;

//     const user = await prisma.user.findUnique({
//         where: { id: parseInt(userId) }
//     });

//     if (!user) {
//         return res.status(404).json({ message: 'Utilisateur non trouvé' });
//     }

//     const profile = await prisma.profile.create({
//         data: {
//             bio,
//             user: {
//                 connect: { id: parseInt(userId) }
//             }
//         }
//     });

//     res.json(profile);
// }

exports.profil_update = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        // Vérification si l'utilisateur existe
        const userExists = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!userExists) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        const updatedProfil = await prisma.user.update({
            where: { id: userId },
            data: {
                profil: {
                    update: {
                        username: req.body.username,
                        bannere: req.body.bannere,
                        thumbnailProfil: req.body.imgProfil,
                        bio: req.body.bio,
                        localisation: req.body.localisation,
                        website: req.body.website,
                    },
                },
            },
            include: { profil: true },
        });

        res.status(201).json({ success: true, updatedProfile: updatedProfil.profil });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du profil.' });
    }
};