const router = require("express").Router();
const optionCtrl = require("../../controllers/presentations/option.controller.js");

router.get("/", optionCtrl.findAll);
router.get("/:idSlide", optionCtrl.findOneBySlide);

module.exports = router;
