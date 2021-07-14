var express = require("express");
var router = express.Router();
const keyPersonals = require("../controllers/keyPersonal.controller");
const VerifyToken = require("../config/VerifyToken");
var validationRule = require("../validationRules/keyPersonal");

router.get("/", VerifyToken, keyPersonals.Index);
router.post(
  "/",
  VerifyToken,
  validationRule.validate("Create"),
  keyPersonals.create
);
router.put(
  "/",
  VerifyToken,
  validationRule.validate("Update"),
  keyPersonals.update
);
router.delete(
  "/",
  VerifyToken,
  validationRule.validate("Delete"),
  keyPersonals.Delete
);
router.get("/admin", VerifyToken, keyPersonals.indexAdmin);

module.exports = router;
