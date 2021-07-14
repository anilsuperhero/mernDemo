var express = require("express")
var router = express.Router()
const settings = require("../controllers/setting.controller")
const VerifyToken = require("../config/VerifyToken")
var validationRule = require("../validationRules/setting")

router.get("/", settings.getSettings)
router.post(
  "/",
  VerifyToken,
  validationRule.validate("Create"),
  settings.createSetting
)
router.put(
  "/",
  VerifyToken,
  validationRule.validate("Edit"),
  settings.updateSetting
)
module.exports = router
