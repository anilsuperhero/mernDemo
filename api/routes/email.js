var express = require("express");
var router = express.Router();
var emailController = require("../controllers/email.controller");
const { body, check } = require("express-validator");
const { validatorMiddleware } = require("../helpers/helpers");
const VerifyToken = require("../config/VerifyToken");
var emailValidationRule = require("../validationRules/email");

router.get("/", emailController.Index);
router.post(
  "/",
  VerifyToken,
  emailValidationRule.validate("Create"),
  emailController.Create
);
router.delete(
  "/",
  VerifyToken,
  emailValidationRule.validate("Delete"),
  emailController.Delete
);
router.put(
  "/",
  VerifyToken,
  emailValidationRule.validate("Update"),
  emailController.Update
);
router.patch(
  "/",
  VerifyToken,
  emailValidationRule.validate("Process"),
  emailController.Process
);
router.get(
  "/getBySlug",
  VerifyToken,
  emailValidationRule.validate("GetBySlug"),
  emailController.GetBySlug
);

module.exports = router;
