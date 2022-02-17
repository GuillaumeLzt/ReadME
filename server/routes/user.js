const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
// Import des fonctions du middleware multer pour la gestion des envoies de fichier 
const multer = require("../middlewares/multer");

router.get("/", userController.home);

router.get('/contact', userController.contact);

router.get('/userProfil', multer, userController.profil);
router.get('/userPhotos', userController.photos);

router.get('/chat', userController.chat);

router.get('/userPhotos', userController.photos);

router.get('/forgottenPassword', userController.forget);
router.post('/forgottenPassword', userController.forgetPost);

router.get('/newpassword', userController.newpassword);
router.post('/newpassword', userController.newpasswordPost);

router.get('/register', userController.register);

router.get('/login', userController.login);
router.get('/logout', userController.logout);

 module.exports = router;