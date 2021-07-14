var keyPersonal_Services = require("../services/keyPersonal/keyPersonal.services");
const { responseData } = require("../helpers/responseData");

module.exports = {
  /**
   * {"first_name":"Ursa","middle_name":"Paki","last_name":"Hansen","email":"ripezam@mailinator.com","mobile_number":"8866458588","positionHeld":"Excepteur exercitati","dob":"2003-06-14"}
   *
   * @method post
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  create: async (req, res) => {
    try {
      await keyPersonal_Services.create(req, res);
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
      await keyPersonal_Services.index(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!";
      return res.json(responseData(msg, {}, 201));
    }
  },
  /**
   * {"first_name":"Ursa","middle_name":"Paki","last_name":"Hansen","email":"ripezam@mailinator.com","mobile_number":"8866458588","positionHeld":"Excepteur exercitati","_id":"60c75cf21d1102362cf51939","dob":"2003-06-14"}
   *
   * @method post
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  update: async (req, res) => {
    try {
      await keyPersonal_Services.update(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG";
      return res.status(422).json(responseData(msg, {}, 422));
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
      await keyPersonal_Services.delete(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!";
      return res.json(responseData(msg, {}, 201));
    }
  },
  /**
   * @method get
   * @param {*} req
   * @param {*} res
   * @returns
   */
  indexAdmin: async (req, res) => {
    try {
      await keyPersonal_Services.indexAdmin(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!";
      return res.json(responseData(msg, {}, 201));
    }
  },
};
