var setting_service = require("../services/setting/settings.services");
const { responseData } = require("../helpers/responseData");

module.exports = {
  /**
   * Get setting data
   *
   * @method get
   *
   * @param {*} req
   * @param {*} res
   * @returns
   *
   */
  getSettings: async (req, res) => {
    try {
      await setting_service.getSettings(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
  /**
   * Create setting data
   * @method post
   *
   * {"email":"admin@exchange.in","name":"Exchange","support_email":"info@exchange.in","address":"6/78, Near Kardhani Shopping Center, Hari Marg, Roop Vihar Colony, Malviya Nagar, Jaipur, Rajasthan 302017","copy_right":"© 2021 - Exchange. All Rights Reserved","email_header":"header","email_footer":"footer"}
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  createSetting: async (req, res) => {
    try {
      await setting_service.createSetting(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
  updateSetting: async (req, res) => {
    try {
      await setting_service.updateSettingApi(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },
};
