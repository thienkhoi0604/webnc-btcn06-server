const router = require("express").Router();
const userCtrl = require("../../controllers/users/user.controller.js");
const auth = require("../../middleware/auth.js");

router.post("/register", userCtrl.register);
router.post("/activation", userCtrl.activateEmail);
router.post("/login", userCtrl.login);
router.post("/facebooklogin", userCtrl.facebookLogin);
router.post("/googlelogin", userCtrl.googleLogin);
router.post("/refresh_token", userCtrl.getAccessToken);
//router.get("/infor", auth, userCtrl.getUserInfor);
router.get("/infor", userCtrl.getUserInfor);
router.get("/logout", userCtrl.logout);
router.get("/get", userCtrl.getAllUsers);
router.get("/:email", userCtrl.getMemberInGroup);

module.exports = router;
