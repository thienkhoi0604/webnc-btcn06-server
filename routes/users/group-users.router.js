const router = require("express").Router();
const groupUserCtrl = require("../../controllers/users/group-users.controller.js");

router.post("/create", groupUserCtrl.create);
router.get("/", groupUserCtrl.getGroupById);

module.exports = router;
