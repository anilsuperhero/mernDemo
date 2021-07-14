var express = require("express")
var router = express.Router()
var faqController = require("../controllers/faq.controller")
const VerifyToken = require("../config/VerifyToken")
var validationRule = require("../validationRules/faq")

router.get("/", faqController.Index)
router.post(
  "/",
  VerifyToken,
  validationRule.validate("Create"),
  faqController.Create
)
router.delete(
  "/",
  VerifyToken,
  validationRule.validate("Delete"),
  faqController.Delete
)
router.put(
  "/",
  VerifyToken,
  validationRule.validate("Edit"),
  faqController.Update
)
router.patch(
  "/",
  VerifyToken,
  validationRule.validate("Delete"),
  faqController.Process
)
router.get("/list", faqController.getList)

module.exports = router
