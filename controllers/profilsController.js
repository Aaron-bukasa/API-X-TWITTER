const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.profil_list = async(req, res) => {
    try {
        const profils = await prisma.profile.findMany();
        res.json(profils);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

exports.profil_detail = async(req, res) => {
    const profilId = parseInt(req.params.id);
    try {
        const profil = await prisma.profile.findUnique({
            where: { id: profilId },
        });
        if(!profil) {
            res.status(404).json({ error: 'Le profil n\'existe pas' });
        } else {
            res.json(profil);
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' })
    }
}

// Create tweet
exports.profil_create = async(req, res) => {
    try {
        const newProfil = await prisma.profile.create({
          data: {
            bannere: req.body.bannere,
            thumbnailProfil: req.body.imgProfil,
            bio: req.body.bio,
            localisation: req.body.localisation,
            webSite:req.body.website
          }
        });
    
        res.status(201).json(newProfil);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    };
}

// Update tweet
exports.profil_update = async(req, res) => {
    try {
        const profilId = parseInt(req.params.id);
    
        const updatedProfil = await prisma.profile.update({
          where: { id: profilId },
          data: { 
            bannere: req.body.bannere,
            thumbnailProfil: req.body.imgProfil,
            bio: req.body.bio,
            localisation: req.body.localisation,
            webSite:req.body.website
           },
        });
    
        res.json(updatedProfil);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

