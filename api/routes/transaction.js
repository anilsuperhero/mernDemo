var express = require("express");
var router = express.Router();
const transaction = require("../controllers/transaction.controller");
const VerifyToken = require("../config/VerifyToken");
var validationRule = require("../validationRules/payment");

router.get("/", VerifyToken, transaction.Index);
router.get("/invoice", transaction.invoice);
router.post(
  "/online",
  VerifyToken,
  validationRule.validate("Online"),
  transaction.create
);
router.post(
  "/transfer",
  VerifyToken,
  validationRule.validate("transfer"),
  transaction.transfer
);
router.get("/admin", VerifyToken, transaction.adminIndex);
module.exports = router;
