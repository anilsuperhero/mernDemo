var notification_service = require("../services/notification/notification.services")
const { responseData } = require("../helpers/responseData")

module.exports = {
  /**
   * Get user notification data
   *
   * @method get
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *
   */
  index: async (req, res) => {
    try {
      await notification_service.getNotification(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG"
      return res.status(422).json(responseData(msg, {}, 422))
    }
  },
  /**
   * Create new notification
   *
   * @method post
   *
   * {"title":"Password Updated","description":"Your password has been changed successfully","type":"NOTIFICATION","user_id":"1234222222222222"}
   *
   * @param {} req
   * @param {*} res
   * @returns
   */
  createNotification: async (req, res) => {
    try {
      await notification_service.createNotification(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG"
      return res.status(422).json(responseData(msg, {}, 422))
    }
  },

  /**
   * Delete all notification
   *
   * @param { } req
   * @param {*} res
   * @returns
   */
  deleteAll: async (req, res) => {
    try {
      await notification_service.deleteAll(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG"
      return res.status(422).json(responseData(msg, {}, 422))
    }
  },
  /**
   * Delete notification
   *
   * @param { } req
   * @param {*} res
   * @returns
   */
  delete: async (req, res) => {
    try {
      await notification_service.delete(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG"
      return res.status(422).json(responseData(msg, {}, 422))
    }
  },
  /**
   * Update notification
   *
   * @param { } req
   * @param {*} res
   * @returns
   */
  update: async (req, res) => {
    try {
      await notification_service.update(req, res)
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG"
      return res.status(422).json(responseData(msg, {}, 422))
    }
  },
}
