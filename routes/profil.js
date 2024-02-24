const express = require('express');
const router = express.Router();
const profil_controller = require("../controllers/profilsController");


// Display, create and update
router.get("/", profil_controller.profil_list);
router.get("/:id", profil_controller.profil_detail);
router.get("/", profil_controller.profil_create);
router.get("/:id", profil_controller.profil_update);

module.exports = router;
