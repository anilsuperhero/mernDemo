const { body } = require("express-validator")
const { validatorMiddleware } = require("../helpers/helpers")

module.exports.validate = (method) => {
  switch (method) {
    case "Create": {
      return [
        body("title")
          .notEmpty()
          .withMessage("Please enter title.")
          .isLength({ min: 3, max: 20 })
          .withMessage("Title should be min 3 and max 20 characters."),
        body("description")
          .notEmpty()
          .withMessage("Please enter description.")
          .isLength({ min: 3 })
          .withMessage("Description should be min 3  characters."),
        body("user_id", "Please enter user id").isLength({ min: 10 }),
        validatorMiddleware,
      ]
    }
  }
}
