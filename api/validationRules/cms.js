const { body, check } = require("express-validator")

const { validatorMiddleware } = require("../helpers/helpers")

module.exports.validate = (method) => {
  switch (method) {
    case "Create": {
      return [
        body("title", "Please enter title.").isLength({ min: 1 }),
        body("content", "ENTER_DESC").isLength({ min: 1 }),
        validatorMiddleware,
      ]
    }
    case "Delete": {
      return [
        check("id").isLength({ min: 1 }).withMessage("Id is missing."),
        validatorMiddleware,
      ]
    }
    case "Update": {
      return [
        check("id").isLength({ min: 1 }).withMessage("Id is missing."),
        body("title", "Please enter title.").isLength({ min: 1 }),
        body("content", "ENTER_DESC").isLength({ min: 1 }),
        validatorMiddleware,
      ]
    }
    case "Process": {
      return [
        check("id").isLength({ min: 1 }).withMessage("Id is missing."),
        validatorMiddleware,
      ]
    }
    case "ContactUs": {
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
        body("message", "ENTER_MESSAGE").isLength({ min: 1 }),
        validatorMiddleware,
      ]
    }
  }
}
