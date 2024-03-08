const express = require('express');
const router = express.Router();
const user_controller = require("../controllers/userController");


/* GET users listing. */
router.post('/signup', user_controller.user_signup);
router.post('/login', user_controller.user_login);

router.get("/users", user_controller.user_list);
router.get("/users/:id", user_controller.userWithProfilGET);
router.get('/users/:id/profil', user_controller.profil_detail);
router.put('/users/:id/profil', user_controller.profil_update);

module.exports = router;
