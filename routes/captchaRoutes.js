const express = require("express");
const { generateCaptcha, verifyCaptcha } = require("../controller/captchaController");
const router = express.Router();

router.get("/", generateCaptcha);
router.post("/verify", verifyCaptcha);

module.exports = router;
