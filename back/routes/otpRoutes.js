const otpController = require("../controller/otpController");
const express = require("express");
const router = express.Router();

router.post("/otp", otpController.otp);
router.post("/otpforRide", otpController.otpride);
router.post("/verify", otpController.verify);

exports.router = router;