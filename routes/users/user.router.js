const router = require("express").Router();
const userCtrl = require("../../controllers/users/user.controller.js");

router.post("/register", userCtrl.register);
router.post("/activation", userCtrl.activateEmail);
router.post("/login", userCtrl.login);
router.post("/refresh_token", userCtrl.getAccessToken);
router.get("/logout", userCtrl.logout);

module.exports = router;
