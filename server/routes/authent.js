const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/authController");
const multer = require("../middlewares/multer");
module.exports = function(app) {
  app.post(
    "/register",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/login", controller.signin);
};