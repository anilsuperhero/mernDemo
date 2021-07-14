var express = require("express")
var router = express.Router()
const users = require("../controllers/admin.controller")
const VerifyToken = require("../config/VerifyToken")
var validationRule = require("../validationRules/customer")

router.put(
  "/change-password",
  VerifyToken,
  validationRule.validate("changePassword"),
  users.changePassword
)
router.post("/", VerifyToken, validationRule.validate("Create"), users.create)
router.put("/", VerifyToken, validationRule.validate("Update"), users.update)
router.get("/", users.Index)
router.delete("/", VerifyToken, validationRule.validate("Delete"), users.Delete)
router.patch("/", VerifyToken, validationRule.validate("Delete"), users.Process)

module.exports = router
