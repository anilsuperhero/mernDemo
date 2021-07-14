const { body, check } = require("express-validator")
const { validatorMiddleware } = require("../helpers/helpers")

module.exports.validate = (method) => {
  switch (method) {
    case "Create": {
      return [
        body("title", "Please enter title.").isLength({ min: 1 }),
        body("description", "ENTER_DESC").isLength({ min: 1 }),
        body("subject", "Please enter subject.").isLength({ min: 1 }),
        body("keyword", "ENTER_KEYWORD").isLength({ min: 1 }),
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
        body("description", "ENTER_DESC").isLength({ min: 1 }),
        body("subject", "Please enter subject.").isLength({ min: 1 }),
        validatorMiddleware,
      ]
    }
    case "Process": {
      return [
        check("id").isLength({ min: 1 }).withMessage("Id is missing."),
        validatorMiddleware,
      ]
    }
    case "GetBySlug": {
      return [
        check("slug").isLength({ min: 1 }).withMessage("Slug is missing."),
        validatorMiddleware,
      ]
    }
  }
}
