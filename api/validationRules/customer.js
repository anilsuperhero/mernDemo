const { body, check } = require("express-validator")
const { validatorMiddleware } = require("../helpers/helpers")

module.exports.validate = (method) => {
  switch (method) {
    case "Create": {
      return [
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
        body("email", "Please enter email address.")
          .isEmail()
          .withMessage("Enter a valid email address.")
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
        body("password", "Please enter password")
          .isLength({ min: 6 })
          .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
          .withMessage(
            "Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 Special Character."
          ),
        validatorMiddleware,
      ]
    }
    case "Update": {
      return [
        body("id").notEmpty().withMessage("Please enter id."),
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
          .withMessage("Enter a valid email address.")
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
      ]
    }
    case "Delete": {
      return [
        check("id").isLength({ min: 1 }).withMessage("Id is missing."),
        validatorMiddleware,
      ]
    }
    case "changePassword": {
      return [
        body("password", "Please enter password")
          .isLength({ min: 6 })
          .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
          .withMessage(
            "Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 special character."
          ),
        body("password_confirmation", "Please enter confirm password")
          .isLength({ min: 6 })
          .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
          .withMessage(
            "Confirm Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 special character."
          ),
        validatorMiddleware,
      ]
    }
  }
}
