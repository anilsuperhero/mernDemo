const { body } = require("express-validator");
const { validatorMiddleware } = require("../helpers/helpers");

module.exports.validate = (method) => {
  switch (method) {
    case "login": {
      return [
        body("email", "Please enter email.").isEmail().isLength({ min: 1 }),
        body("password", "Please enter password.").isLength({ min: 1 }),
        validatorMiddleware,
      ];
    }
    case "register": {
      return [
        body("first_name")
          .notEmpty()
          .withMessage("Please enter first name.")
          .isLength({ min: 3, max: 20 })
          .withMessage(
            "First name should be at least 3 characters and not exceed 20 characters."
          ),
        body("last_name")
          .notEmpty()
          .withMessage("Please enter last name.")
          .isLength({ min: 3, max: 20 })
          .withMessage(
            "Last name should be at least 3 characters and not exceed 20 characters."
          ),
        body("email", "Please enter email address.")
          .isEmail()
          .withMessage("Enter a valid email address.")
          .isLength({ min: 5 }),
        body("role_id", "Please enter user type.")
          .isLength({ min: 1 })
          .isNumeric(),
        body("password", "Please enter password.")
          .isLength({ min: 6 })
          .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
          .withMessage(
            "Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 Special Character."
          ),
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
      ];
    }
    case "forgot-password": {
      return [
        body("email", "Please enter email address.")
          .isEmail()
          .isLength({ min: 1 }),
        validatorMiddleware,
      ];
    }
  }
};
