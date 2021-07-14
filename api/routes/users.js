var express = require("express");
var router = express.Router();
const users = require("../controllers/user.controller");
const VerifyToken = require("../config/VerifyToken");
const { body } = require("express-validator");
const { validatorMiddleware } = require("../helpers/helpers");

router.put(
  "/change-password",
  VerifyToken,
  [
    body("password", "Please enter password")
      .isLength({ min: 6 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
      .withMessage(
        "Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 Special Character."
      ),
    body("current_password", "Please enter current password")
      .isLength({ min: 6 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
      .withMessage(
        "Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 Special Character."
      ),
    body("password_confirmation", "Please enter confirm password")
      .isLength({ min: 6 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
      .withMessage(
        "Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 Special Character."
      ),
    validatorMiddleware,
  ],
  users.changePassword
);
router.post(
  "/admin/profile-update",
  VerifyToken,
  [
    body("first_name")
      .notEmpty()
      .withMessage("Please enter first name.")
      .isLength({ min: 3, max: 20 })
      .withMessage("First name should be min 3 and max 20 characters."),
    body("last_name")
      .notEmpty()
      .withMessage("Please enter last name.")
      .isLength({ min: 3, max: 20 })
      .withMessage("Last name should be min 3 and max 20 characters."),
    body("email", "Please enter email")
      .isEmail()
      .withMessage("Enter a valid email address")
      .isLength({ min: 5 }),
    body("mobile_number")
      .notEmpty()
      .withMessage("Please enter mobile number.")
      .isLength({ min: 7, max: 15 })
      .withMessage(
        "Mobile number should be at least 7 digits and not exceed 15 digits."
      )
      .isNumeric()
      .withMessage("Please enter valid mobile number."),
    validatorMiddleware,
  ],
  users.updateProfileAdmin
);
router.get("/dashboard", VerifyToken, users.dashboard);
router.post(
  "/company/profile-update",
  VerifyToken,
  [
    body("first_name")
      .notEmpty()
      .withMessage("Please enter first name.")
      .isLength({ min: 3, max: 20 })
      .withMessage("First name should be min 3 and max 20 characters."),
    body("last_name")
      .notEmpty()
      .withMessage("Please enter last name.")
      .isLength({ min: 3, max: 20 })
      .withMessage("Last name should be min 3 and max 20 characters."),
    body("mobile_number")
      .notEmpty()
      .withMessage("Please enter mobile number.")
      .isLength({ min: 7, max: 15 })
      .withMessage(
        "Mobile number should be at least 7 digits and not exceed 15 digits."
      )
      .isNumeric()
      .withMessage("Please enter valid mobile number."),
    validatorMiddleware,
  ],
  users.updateProfileCompany
);

router.post(
  "/auditor/profile-update",
  VerifyToken,
  [
    body("first_name")
      .notEmpty()
      .withMessage("Please enter first name.")
      .isLength({ min: 3, max: 20 })
      .withMessage("First name should be min 3 and max 20 characters."),
    body("last_name")
      .notEmpty()
      .withMessage("Please enter last name.")
      .isLength({ min: 3, max: 20 })
      .withMessage("Last name should be min 3 and max 20 characters."),
    body("mobile_number")
      .notEmpty()
      .withMessage("Please enter mobile number.")
      .isLength({ min: 7, max: 15 })
      .withMessage(
        "Mobile number should be at least 7 digits and not exceed 15 digits."
      )
      .isNumeric()
      .withMessage("Please enter valid mobile number."),
    validatorMiddleware,
  ],
  users.updateProfileAuditor
);

module.exports = router;
