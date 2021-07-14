var express = require("express");
var router = express.Router();
var controller = require("../controllers/audits.controller");
const VerifyToken = require("../config/VerifyToken");
var validationRule = require("../validationRules/audits");

router.get("/", VerifyToken, controller.Index);
router.post(
  "/",
  VerifyToken,
  validationRule.validate("Create"),
  controller.Create
);
router.delete("/", VerifyToken, controller.Delete);
router.get("/admin", VerifyToken, controller.indexAdmin);
router.post(
  "/slaUpload",
  VerifyToken,
  validationRule.validate("slaUpload"),
  controller.slaUpload
);
router.post("/signature", VerifyToken, controller.slaSignature);
router.get("/docuSign", VerifyToken, controller.docuSign);
module.exports = router;
