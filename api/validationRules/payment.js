const { body } = require("express-validator");
const { validatorMiddleware } = require("../helpers/helpers");

module.exports.validate = (method) => {
  switch (method) {
    case "Online": {
      return [
        body("token")
          .notEmpty()
          .withMessage("Please enter token.")
          .isLength({ min: 3, max: 100 })
          .withMessage("Token should be min 3 and max 100 characters."),
        body("type")
          .notEmpty()
          .withMessage("Please enter type.")
          .isLength({ min: 3, max: 20 })
          .withMessage("Type should be min 3 and max 20 characters."),
        body("amount")
          .notEmpty()
          .withMessage("Please enter amount.")
          .isLength({ min: 1 })
          .isNumeric()
          .withMessage("Please enter valid amount."),
        validatorMiddleware,
      ];
    }
    case "transfer": {
      return [
        body("remarks")
          .notEmpty()
          .withMessage("Please enter remarks.")
          .isLength({ min: 3, max: 500 })
          .withMessage("Remark should be min 3 and max 500 characters."),
        body("type")
          .notEmpty()
          .withMessage("Please enter type.")
          .isLength({ min: 3, max: 20 })
          .withMessage("Type should be min 3 and max 20 characters."),
        body("amount")
          .notEmpty()
          .withMessage("Please enter amount.")
          .isLength({ min: 1 })
          .isNumeric()
          .withMessage("Please enter valid amount."),
        validatorMiddleware,
      ];
    }
  }
};
