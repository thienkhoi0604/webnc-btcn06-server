const router = require("express").Router();
const slideCtrl = require("../../controllers/presentations/slide.controller.js");

router.get("/", slideCtrl.findAll);
router.post("/", slideCtrl.create);
router.get("/:idPresentation", slideCtrl.findOneByPresentation);
router.delete("/:id", slideCtrl.delete);

module.exports = router;
