var express = require("express");
var router = express.Router();
var auth = require("../controllers/auth.controller.js");
var validationRule = require("../validationRules/auth");

router.post(
  "/auditorLogin",
  validationRule.validate("login"),
  auth.auditorLogin
);
router.post(
  "/customerLogin",
  validationRule.validate("login"),
  auth.customerLogin
);
router.post("/login", validationRule.validate("login"), auth.login);
router.post("/register", validationRule.validate("register"), auth.register);
router.post(
  "/forgot-password",
  validationRule.validate("forgot-password"),
  auth.forgotPassword
);
router.get("/logout", auth.logout);
router.post("/update-password-with-otp", auth.updatePasswordWithOTPMobile);

module.exports = router;
