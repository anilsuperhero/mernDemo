const { responseData } = require("../helpers/responseData")
var cms_service = require("../services/cms/cms.services")

module.exports = {
  /**
   * @method get
   * @param {*} req
   * @param {*} res
   * @returns
   */
  Index: async (req, res) => {
    try {
      await cms_service.index(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!"
      return res.json(responseData(msg, {}, 201))
    }
  },
  /**
   *
   * @method post
   *
   * {"title":"about us","content":"about us","status":"1"}
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  Create: async (req, res) => {
    try {
      await cms_service.create(req, res)
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
      await cms_service.delete(req, res)
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
      await cms_service.update(req, res)
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
      await cms_service.process(req, res)
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
  getPage: async (req, res) => {
    try {
      await cms_service.getPage(req, res)
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
  ContactUs: async (req, res) => {
    try {
      await cms_service.contactUs(req, res)
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
  contactUsList: async (req, res) => {
    try {
      await cms_service.contactUsList(req, res)
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
  deleteContact: async (req, res) => {
    try {
      await cms_service.deleteContact(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!"
      return res.json(responseData(msg, {}, 201))
    }
  },
}
