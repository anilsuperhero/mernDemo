const { body } = require("express-validator");
const { validatorMiddleware } = require("../helpers/helpers");

module.exports.validate = (method) => {
  switch (method) {
    case "Create": {
      return [
        body("title")
          .notEmpty()
          .withMessage("Please enter title.")
          .isLength({ min: 3, max: 150 })
          .withMessage("Title should be min 3 and max 150 characters."),
        body("size_of_company")
          .notEmpty()
          .withMessage("Company Size Should not be empty")
          .isLength({ min: 1, max: 10 })
          .withMessage(
            "Company Size should be at least 10 digits and not exceed 1000 digits."
          )
          .isNumeric()
          .withMessage("Please enter valid Size"),
        validatorMiddleware,
      ];
    }
    case "slaUpload": {
      return [
        body("amount").notEmpty().withMessage("Please enter amount."),
        body("_id").notEmpty().withMessage("Please enter id."),
        validatorMiddleware,
      ];
    }
  }
};
