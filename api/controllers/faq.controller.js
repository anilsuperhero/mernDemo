const { responseData } = require("../helpers/responseData")
var faq_service = require("../services/faq/faq.services")

module.exports = {
  /**
   * @method get
   * @param {*} req
   * @param {*} res
   * @returns
   */
  Index: async (req, res) => {
    try {
      await faq_service.index(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!"
      return res.json(responseData(msg, {}, 201))
    }
  },
  /**
   *
   * @method post
   *
   * {"title":"about us","description":"about us"}
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  Create: async (req, res) => {
    try {
      await faq_service.create(req, res)
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
      await faq_service.delete(req, res)
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
  Update: async (req, res) => {
    try {
      await faq_service.update(req, res)
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
  Process: async (req, res) => {
    try {
      await faq_service.process(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!"
      return res.json(responseData(msg, {}, 201))
    }
  },
  /**
   * @method get
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getList: async (req, res) => {
    try {
      await faq_service.getList(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!"
      return res.json(responseData(msg, {}, 201))
    }
  },
}
