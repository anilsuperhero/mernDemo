var transaction_Services = require("../services/transaction/transaction.services");
const { responseData } = require("../helpers/responseData");

module.exports = {
  /**
   * {"id": "60deb75a1a872638f02eb7e2","token": "tok_1J8jaM2eZvKYlo2CEp1Rj1xl","type": "ONLINE","amount": 150000}
   *
   * @method post
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  create: async (req, res) => {
    try {
      await transaction_Services.create(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
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
      await transaction_Services.index(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!";
      return res.json(responseData(msg, {}, 201));
    }
  },

  /**
   * {"remarks":"testt tt et t","id":"60deb75a1a872638f02eb7e2","type":"BANKTRANSFER","amount":150000}
   *
   * @method post
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  transfer: async (req, res) => {
    try {
      await transaction_Services.transfer(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
    }
  },

  /**
   * @method get
   * @param {*} req
   * @param {*} res
   * @returns
   */
  invoice: async (req, res) => {
    try {
      await transaction_Services.invoice(req, res);
    } catch (err) {
      var msg = err.message || "Something went wrong, Please try again!";
      return res.json(responseData(msg, {}, 200));
    }
  },
  /**
   * @method get
   * @param {*} req
   * @param {*} res
   * @returns
   */
  adminIndex: async (req, res) => {
    try {
      await transaction_Services.adminIndex(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!";
      return res.json(responseData(msg, {}, 201));
    }
  },
};
