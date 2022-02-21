const express = require("express");
const router = express.Router();

const { verifyToken, isAdmin, isModerator } = require("../middlewares/authJwt");
const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require("../middlewares/verifySignUp");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const photoController = require('../controllers/photoController');
const postController = require('../controllers/postController');
// Import des fonctions du middleware multer pour la gestion des envoies de fichier 
const multer = require("../middlewares/multer");

/**
 * ROUTES DES GESTION DES ENREGISTREMENT ET DES CONNEXIONS
 * */
router.post("/register", [checkDuplicateUsernameOrEmail, checkRolesExisted], authController.signup);
router.post("/login", authController.signin);



/** 
 * ROUTES DE GESTION DES AUTHORISATIONS
 * */
router.get("/api/test/all", userController.allAccess);
router.get("/api/test/user", [verifyToken], userController.userBoard);
router.get("/api/test/mod", [verifyToken, isModerator], userController.moderatorBoard);
router.get("/api/test/admin", [verifyToken, isAdmin], userController.adminBoard);


/**
 * ROUTES DE GESTION DES POSTS DES UTILISATEURS
 * **/

router.get("/userPhotos", photoController.getUserPhoto);
router.post("/userPhotos", multer, photoController.sendPost);
router.get("/userProfil", postController.sendPostOnUserProfil);
router.post("/userProfil", multer, postController.getPostOnUserProfil);
/*
 * ROUTE DE GESTION DES ACCES AUX DIFFRENTES PAGES DES UTILISATEURS
*/


router.get("/", userController.home);

router.get('/contact', userController.contact);

router.get('/userProfil', multer, userController.profil);

router.get('/chat', userController.chat);

//router.post('/userPhotos', multer, userController.photosPost);

router.get('/forgottenPassword', userController.forget);
router.post('/forgottenPassword', userController.forgetPost);

router.get('/newpassword', userController.newpassword);
router.post('/newpassword', userController.newpasswordPost);

router.get('/register', userController.register);

router.get('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;