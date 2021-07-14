const Users = require("../../models/User");
const { responseData } = require("../../helpers/responseData");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fs = require("fs");
var moment = require("moment");
const PRIVATE_KEY = fs.readFileSync("config/private.key");
const { generateOTP, sendMail } = require("../../helpers/helpers");
const { uuid } = require("uuidv4");
var email_service = require("../email/email.services");
const _ = require("lodash");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const select = {
        first_name: 1,
        password: 1,
        status: 1,
        last_name: 1,
        email: 1,
        mobile_number: 1,
        api_token: 1,
        last_login_at: 1,
        image: 1,
      };
      var user = {};
      user.email = email;
      user.role_id = [1, 2];
      Users.findOne(user, select, async function (err, result) {
        if (err || !result) {
          return res.status(422).json(responseData("INVALID_LOGIN", {}, 422));
        } else {
          const verified = bcrypt.compareSync(password, result.password);
          if (!verified) {
            return res.status(422).json(responseData("INVALID_LOGIN", {}, 422));
          } else if (!result.status) {
            return res
              .status(422)
              .json(responseData("ACCOUNT_DEACTIVE", {}, 422));
          } else {
            var unique_token = await jwt.sign({ id: result._id }, PRIVATE_KEY, {
              algorithm: "RS256",
            });
            await Users.updateOne(
              { _id: result._id },
              {
                api_token: unique_token,
                last_login_at: moment().format("MM ddd, YYYY HH:mm a"),
              }
            );
            result.api_token = unique_token;
            return res.json(responseData("ACCOUNT_LOGIN", result));
          }
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  customerLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const select = {
        first_name: 1,
        password: 1,
        status: 1,
        last_name: 1,
        email: 1,
        mobile_number: 1,
        api_token: 1,
        last_login_at: 1,
        image: 1,
        abn_number: 1,
        address: 1,
        company_name: 1,
        address_line: 1,
        city: 1,
        postcode: 1,
        state: 1,
      };
      var user = {};
      user.email = email;
      user.role_id = [3];
      Users.findOne(user, select, async function (err, result) {
        if (err || !result) {
          return res.status(422).json(responseData("INVALID_LOGIN", {}, 422));
        } else {
          const verified = bcrypt.compareSync(password, result.password);
          if (!verified) {
            return res.status(422).json(responseData("INVALID_LOGIN", {}, 422));
          } else if (!result.status) {
            return res
              .status(422)
              .json(responseData("ACCOUNT_DEACTIVE", {}, 422));
          } else {
            var unique_token = await jwt.sign({ id: result._id }, PRIVATE_KEY, {
              algorithm: "RS256",
            });
            await Users.updateOne(
              { _id: result._id },
              {
                api_token: unique_token,
                last_login_at: moment().format("MM ddd, YYYY HH:mm a"),
              }
            );
            result.api_token = unique_token;
            return res.json(responseData("ACCOUNT_LOGIN", result));
          }
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  auditorLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const select = {
        first_name: 1,
        password: 1,
        status: 1,
        last_name: 1,
        email: 1,
        mobile_number: 1,
        api_token: 1,
        last_login_at: 1,
        image: 1,
        address: 1,
      };
      var user = {};
      user.email = email;
      user.role_id = [4];
      Users.findOne(user, select, async function (err, result) {
        if (err || !result) {
          return res.status(422).json(responseData("INVALID_LOGIN", {}, 422));
        } else {
          const verified = bcrypt.compareSync(password, result.password);
          if (!verified) {
            return res.status(422).json(responseData("INVALID_LOGIN", {}, 422));
          } else if (!result.status) {
            return res
              .status(422)
              .json(responseData("ACCOUNT_DEACTIVE", {}, 422));
          } else {
            var unique_token = await jwt.sign({ id: result._id }, PRIVATE_KEY, {
              algorithm: "RS256",
            });
            await Users.updateOne(
              { _id: result._id },
              {
                api_token: unique_token,
                last_login_at: moment().format("MM ddd, YYYY HH:mm a"),
              }
            );
            result.api_token = unique_token;
            return res.json(responseData("ACCOUNT_LOGIN", result));
          }
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  register: async (req, res) => {
    try {
      const { email, password, role_id, first_name, last_name, mobile_number } =
        req.body;
      const passwordHash = bcrypt.hashSync(password, 10);
      var user = new Users();
      var token = uuid();
      var otp = await generateOTP();
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      user.image = null;
      user.old_image = null;
      user.password = passwordHash;
      user.role_id = role_id;
      user.token = token;
      user.otp = otp;
      user.status = role_id === 1 ? 1 : 0;
      user.mobile_number = mobile_number;
      user.save(async function (err) {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message;
            return res.status(422).json(responseData(str, {}, 422));
          }
        } else {
          return res.json(responseData("REGISTRATION_DONE"));
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      var user = {};
      user.email = email;
      Users.findOne(user, async function (err, result) {
        if (err || !result) {
          return res
            .status(422)
            .json(responseData("FORGOT_PASSWORD_EMAIL", {}, 422));
        } else {
          var otp = Math.floor(1000 + Math.random() * 9000);
          await Users.updateOne({ _id: result._id }, { otp: otp });

          /**
           * Send Email
           */
          var options = await email_service.getEmailTemplateBySlug(
            "forgot-password"
          );
          options.description = _.replace(
            options.description,
            "[FirstName]",
            result.first_name
          );
          options.description = _.replace(
            options.description,
            "[LastName]",
            result.last_name
          );
          options.description = _.replace(options.description, "[OTP]", otp);
          options.toEmail = result.email;
          sendMail(options);
          return res.json(responseData("FORGOT_PASSWORD_OTP"));
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  logout: async (req, res) => {
    try {
      return res.json(responseData("Logged out successfully."));
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  updatePasswordWithOTPEmail: async (req, res) => {
    try {
      const { password, otp } = req.body;
      Users.findOne({ otp: otp }, async function (err, result) {
        if (err || !result) {
          if (!result) {
            return res.status(422).json(responseData("OTP_NOT_MATCH", {}, 422));
          }
          return res.status(422).json(responseData("OTP_NOT_MATCH", {}, 422));
        } else {
          const passwordHash = bcrypt.hashSync(password, 10);
          var user = {};
          user.password = passwordHash;
          user.otp = null;
          await Users.updateOne({ otp: otp }, user);
          return res.json(responseData("PASSWORD_UPDATE"));
        }
      });
    } catch (err) {
      return res
        .status(getDynamicErrorCode(req))
        .json(responseData(err.message, {}, getDynamicErrorCode(req)));
    }
  },
};
