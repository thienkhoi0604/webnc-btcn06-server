const router = require("express").Router();
const presentationCtrl = require("../controllers/presentation.controller.js");

router.get("/", presentationCtrl.findAll);
router.get("/:id", presentationCtrl.findOne);
router.post("/", presentationCtrl.create);

module.exports = router;
