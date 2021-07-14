const { responseData } = require("../helpers/responseData");
var service = require("../services/audits/audits.services");

module.exports = {
  /**
   * @method get
   * @param {*} req
   * @param {*} res
   * @returns
   */
  Index: async (req, res) => {
    try {
      await service.index(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!";
      return res.json(responseData(msg, {}, 201));
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
      await service.create(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!";
      return res.json(responseData(msg, {}, 201));
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
      await service.delete(req, res);
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
      await service.indexAdmin(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!";
      return res.json(responseData(msg, {}, 201));
    }
  },
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  slaUpload: async (req, res) => {
    try {
      await service.slaUpload(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!";
      return res.json(responseData(msg, {}, 201));
    }
  },
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  slaSignature: async (req, res) => {
    try {
      await service.slaSignature(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!";
      return res.json(responseData(msg, {}, 201));
    }
  },
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  docuSign: async (req, res) => {
    try {
      await service.docuSign(req, res);
    } catch (err) {
      var msg = err.message || "SOMETHING_WENT_WRONG!";
      return res.json(responseData(msg, {}, 201));
    }
  },
};
