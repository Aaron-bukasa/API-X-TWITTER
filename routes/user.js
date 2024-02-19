const express = require('express');
const router = express.Router();
const user_controller = require("../controllers/userController");


/* GET users listing. */
router.post('/signup', user_controller.user_signup);
router.post('/login', user_controller.user_login);

module.exports = router;
