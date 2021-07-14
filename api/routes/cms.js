var express = require("express")
var router = express.Router()
var cmsController = require("../controllers/cms.controller")
const { body, check } = require("express-validator")
const { validatorMiddleware } = require("../helpers/helpers")
const VerifyToken = require("../config/VerifyToken")
var cmsValidationRule = require("../validationRules/cms")

router.get("/", cmsController.Index)
router.post(
  "/",
  VerifyToken,
  cmsValidationRule.validate("Create"),
  cmsController.Create
)
router.delete(
  "/",
  VerifyToken,
  cmsValidationRule.validate("Delete"),
  cmsController.Delete
)
router.put(
  "/",
  VerifyToken,
  cmsValidationRule.validate("Update"),
  cmsController.Update
)
router.patch(
  "/",
  VerifyToken,
  cmsValidationRule.validate("Process"),
  cmsController.Process
)
router.get("/page/:slug", cmsController.getPage)
router.post(
  "/contactUs",
  cmsValidationRule.validate("ContactUs"),
  cmsController.ContactUs
)
router.get("/contactUs", cmsController.contactUsList)
router.delete(
  "/contactUs",
  VerifyToken,
  cmsValidationRule.validate("Delete"),
  cmsController.deleteContact
)
module.exports = router
