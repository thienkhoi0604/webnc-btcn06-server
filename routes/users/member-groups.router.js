const router = require("express").Router();
const memberGroupCtrl = require("../../controllers/users/member-group.controller.js");

router.get("/getinfo/:id", memberGroupCtrl.getMemberInGroup);
router.post("/delete", memberGroupCtrl.deleteMemberInGroup);
router.post("/deleteAllMember", memberGroupCtrl.deleteAllMemberInGroup);
router.post("/send/invitation", memberGroupCtrl.sendInvitation);
router.post("/addMember", memberGroupCtrl.addMember);
router.get("/:email", memberGroupCtrl.getGroupOfUser);

module.exports = router;
