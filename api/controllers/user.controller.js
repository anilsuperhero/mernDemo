var user_service = require("../services/user/users.services");
const { responseData } = require("../helpers/responseData");

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
      await user_service.changePassword(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
  updateProfileAdmin: async (req, res) => {
    try {
      await user_service.updateProfileAdmin(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
  dashboard: async (req, res) => {
    try {
      await user_service.dashboard(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
  updateProfileCompany: async (req, res) => {
    try {
      await user_service.updateProfileCompany(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
  updateProfileAuditor: async (req, res) => {
    try {
      await user_service.updateProfileAuditor(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
};
