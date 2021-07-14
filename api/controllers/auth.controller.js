var auth_service = require("../services/auth/auth.services");
const { responseData } = require("../helpers/responseData");

module.exports = {
  /**
   * User login
   *
   * @method post
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *
   * {"email":"admincaa@mailinator.com","password":"Octald@123"}
   */
  login: async (req, res) => {
    try {
      await auth_service.login(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
  /**
   * User login
   *
   * @method post
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *
   * {"email":"admincaa@mailinator.com","password":"Octald@123"}
   */
  customerLogin: async (req, res) => {
    try {
      await auth_service.customerLogin(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },

  /**
   * User login
   *
   * @method post
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *
   * {"email":"admincaa@mailinator.com","password":"Octald@123"}
   */
  auditorLogin: async (req, res) => {
    try {
      await auth_service.auditorLogin(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
  /**
   * User Register
   *
   * @method post
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *
   * {"first_name":"anil","last_name":"sharma","email":"admincaa@mailinator.com","password":"Octald@123","device_token":"08b4e5f-75b4-1d81-fee4-0f4d4dee1f31","role_id":1,"mobile_number":"8888585858"}
   */
  register: async (req, res) => {
    try {
      await auth_service.register(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
  /**
   * OTP resend
   *
   * @method post
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  otpResend: async (req, res) => {
    try {
      await auth_service.otpResend(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },

  /**
   * Forgot Password
   *
   * @method post
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  forgotPassword: async (req, res) => {
    try {
      await auth_service.forgotPassword(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },

  /**
   * Forgot password for admin
   *
   * @method post
   * @param {*} req
   * @param {*} res
   * @returns
   */
  forgotPasswordEmail: async (req, res) => {
    try {
      await auth_service.forgotPasswordEmail(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
  /**
   * Update Password with OTP
   *
   * @method post
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  updatePasswordWithOTPMobile: async (req, res) => {
    try {
      await auth_service.updatePasswordWithOTPEmail(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
  /**
   * Logout current user
   *
   * @method get
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  logout: async (req, res) => {
    try {
      await auth_service.logout(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
};
