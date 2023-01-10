const router = require("express").Router();
const presentationCtrl = require("../../controllers/presentations/presentation.controller");

router.get("/", presentationCtrl.findAll);
router.get("/:id", presentationCtrl.findOne);
router.post("/", presentationCtrl.create);

module.exports = router;
