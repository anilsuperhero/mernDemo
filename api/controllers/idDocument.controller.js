const { responseData } = require("../helpers/responseData")
var service = require("../services/idDocument/idDocument.services")

module.exports = {
  /**
   * @method get
   * @param {*} req
   * @param {*} res
   * @returns
   */
  Index: async (req, res) => {
    try {
      await service.index(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!"
      return res.json(responseData(msg, {}, 201))
    }
  },
  /**
   *
   * @method post
   *
   * {"id":"","title":"test","type":"company","extension":[".pdf",".jpg"]}
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  Create: async (req, res) => {
    try {
      await service.create(req, res)
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
      await service.delete(req, res)
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
      await service.update(req, res)
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
      await service.process(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!"
      return res.json(responseData(msg, {}, 201))
    }
  },
}
