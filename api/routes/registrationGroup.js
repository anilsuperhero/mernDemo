var express = require("express");
var router = express.Router();
var controller = require("../controllers/registrationGroup.controller");
const VerifyToken = require("../config/VerifyToken");
var validationRule = require("../validationRules/registrationGroup");

router.get("/", controller.Index);
router.get("/list", controller.getList);
router.post(
  "/",
  VerifyToken,
  validationRule.validate("Create"),
  controller.Create
);
router.delete(
  "/",
  VerifyToken,
  validationRule.validate("Delete"),
  controller.Delete
);
router.put(
  "/",
  VerifyToken,
  validationRule.validate("Update"),
  controller.Update
);
router.patch(
  "/",
  VerifyToken,
  validationRule.validate("Process"),
  controller.Process
);

module.exports = router;
