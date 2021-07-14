const { body, check } = require("express-validator")
const { validatorMiddleware } = require("../helpers/helpers")

module.exports.validate = (method) => {
  switch (method) {
    case "Create": {
      return [
        body("title", "Please enter title.").isLength({ min: 1 }),
        validatorMiddleware,
      ]
    }
    case "Edit": {
      return [
        body("id", "Please enter id.").isLength({ min: 15 }),
        body("title", "Please enter title.").isLength({ min: 1 }),
        validatorMiddleware,
      ]
    }
    case "Delete": {
      return [
        check("id").isLength({ min: 1 }).withMessage("Id is missing."),
        validatorMiddleware,
      ]
    }
  }
}
