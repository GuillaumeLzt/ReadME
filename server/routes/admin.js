const express = require("express");
const cors = require('cors');
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
var corsOptions = {
origin: 'http://localhost:3000'
};

router.get("/", userController.home);
router.get('/contact', userController.contact);

router.get('/userProfil', userController.profil);

router.get('/userPhotos', userController.photos);
router.get('/forgetpassword', userController.forget);
router.post('/forgetpassword', userController.forgetPost);

router.get('/newpassword', userController.newpassword);
router.post('/newpassword', userController.newpasswordPost);

router.get('/register', userController.register);

router.get("/login", userController.login);

 module.exports = router;