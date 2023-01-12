const router = require("express").Router();
const presentationCtrl = require("../../controllers/presentations/presentation.controller");

router.get("/", presentationCtrl.findAll);
router.post("/", presentationCtrl.create);
router.get("/:id", presentationCtrl.findOne);

module.exports = router;
