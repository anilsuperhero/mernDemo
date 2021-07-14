const { body } = require("express-validator");
const { validatorMiddleware } = require("../helpers/helpers");

module.exports.validate = (method) => {
  switch (method) {
    case "Create": {
      return [
        body("name")
          .notEmpty()
          .withMessage("Please enter name.")
          .isLength({ min: 3, max: 100 })
          .withMessage(
            "Name should be at least 3 characters and not exceed 100 characters."
          ),
        body("email", "Please enter email address.")
          .isEmail()
          .withMessage("Enter a valid email address.")
          .isLength({ min: 5 }),
        body("support_email", "Please enter support email.")
          .isEmail()
          .withMessage("Enter a valid support email address.")
          .isLength({ min: 5 }),
        body("address", "Please enter address.").isLength({ min: 3 }),
        body("copy_right", "Please enter copy right.").isLength({ min: 3 }),
        body("email_header", "EMAIL_HEADER").isLength({ min: 1 }),
        body("email_footer", "EMAIL_FOOTER").isLength({ min: 1 }),
        validatorMiddleware,
      ];
    }
    case "Edit": {
      return [
        body("id").notEmpty().withMessage("Please enter id."),
        body("name")
          .notEmpty()
          .withMessage("Please enter name.")
          .isLength({ min: 3, max: 100 })
          .withMessage(
            "Name should be at least 3 characters and not exceed 100 characters."
          ),
        body("email", "Please enter email address.")
          .isEmail()
          .withMessage("Enter a valid email address.")
          .isLength({ min: 5 }),
        body("support_email", "Please enter support email.")
          .isEmail()
          .withMessage("Enter a valid support email address.")
          .isLength({ min: 5 }),
        body("address", "Please enter address.").isLength({ min: 3 }),
        body("copy_right", "Please enter copy right.").isLength({ min: 3 }),
        body("email_header", "EMAIL_HEADER").isLength({ min: 1 }),
        body("email_footer", "EMAIL_FOOTER").isLength({ min: 1 }),
        validatorMiddleware,
      ];
    }
  }
};
