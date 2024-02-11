const express = require("express");
const router = express.Router();  
const controller = require("../controllers/userController.js");


router.use(express.json());

router.post("/send-otp", controller.sendOtp);
router.post("/verify-otp" , controller.verifyOtp);
module.exports = router;
