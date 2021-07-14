var customer_service = require("../services/customer/customer.services")
const { responseData } = require("../helpers/responseData")

module.exports = {
  /**
   * Change user Password
   *
   * {"current_password":"Octal@123","password":"Octal@123","password_confirmation":"Octal@123"}
   *
   * @method put
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *
   */
  changePassword: async (req, res) => {
    try {
      await customer_service.changePassword(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG"
      return res.status(422).json(responseData(msg, {}, 422))
    }
  },
  /**
   * {"first_name":"anil","last_name":"sharma","email":"anil.sharma@octalinfosolution.com","mobile_number":"7424816199","password":"Octal@123"}
   *
   * @method post
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  create: async (req, res) => {
    try {
      await customer_service.create(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG"
      return res.status(422).json(responseData(msg, {}, 422))
    }
  },
  /**
   * @method get
   * @param {*} req
   * @param {*} res
   * @returns
   */
  Index: async (req, res) => {
    try {
      await customer_service.index(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!"
      return res.json(responseData(msg, {}, 201))
    }
  },
  /**
   * {"first_name":"anil","last_name":"sharma","email":"anil.sharma@octalinfosolution.com","mobile_number":"7424816199","password":"Octal@123"}
   *
   * @method post
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  update: async (req, res) => {
    try {
      await customer_service.update(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG"
      return res.status(422).json(responseData(msg, {}, 422))
    }
  },
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  Process: async (req, res) => {
    try {
      await customer_service.process(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!"
      return res.json(responseData(msg, {}, 201))
    }
  },
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  Delete: async (req, res) => {
    try {
      await customer_service.delete(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!"
      return res.json(responseData(msg, {}, 201))
    }
  },
}
