const Users = require("../../models/User");
const { responseData } = require("../../helpers/responseData");
const { sendMail, saveFile, saveThumbFile } = require("../../helpers/helpers");
const bcrypt = require("bcryptjs");
const { response } = require("../../resources/response");
const _ = require("lodash");
var email_service = require("../email/email.services");
const config = require("../../config/config");

module.exports = {
  index: async (req, res) => {
    try {
      let {
        page,
        sort,
        direction,
        keyword,
        status,
        created_at_from,
        created_at_to,
      } = req.query;
      keyword = _.trim(keyword);
      var regexString = "";

      const sortOptions = {
        [sort || "created_at"]: direction === "desc" ? 1 : -1,
      };
      const options = {
        page: page || 1,
        limit: process.env.ADMIN_LIST_PAGING_LIMIT || 20,
        sort: sortOptions,
        select: [
          "first_name",
          "updated_at",
          "status",
          "last_name",
          "email",
          "mobile_number",
          "image",
          "old_image",
          "created_at",
        ],
      };
      var query = { isDeleted: false };

      if (keyword) {
        var terms = keyword.split(" ");

        for (var i = 0; i < terms.length; i++) {
          regexString += terms[i];
          if (i < terms.length - 1) regexString += "|";
        }
        query = {
          $or: [
            { first_name: { $regex: regexString, $options: "i" } },
            { last_name: { $regex: regexString, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
            { mobile_number: { $regex: keyword, $options: "i" } },
          ],
        };
      }
      if (status) {
        query.status = status;
      }
      if (created_at_from && created_at_to) {
        query.created_at = {
          $gte: new Date(created_at_from + "T00:00:00.000Z").toISOString(),
          $lte: new Date(created_at_to + "T23:59:00.000Z").toISOString(),
        };
      } else if (created_at_from) {
        query.created_at = {
          $gte: new Date(created_at_from + "T00:00:00.000Z").toISOString(),
        };
      } else if (created_at_to) {
        query.created_at = {
          $lte: new Date(created_at_to + "T23:59:00.000Z").toISOString(),
        };
      }
      query.role_id = 2;
      query.isDeleted = false;
      Users.paginate(query, options, async function (err, result) {
        if (err) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422));
        }
        const data = await response(result);
        return res.json(responseData("DATA_RECEIVED", data));
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  changePassword: async (req, res) => {
    try {
      const { password, id } = req.body;
      Users.findOne({ _id: id }, async function (err, result) {
        if (err || !result) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422));
        } else {
          const passwordHash = bcrypt.hashSync(password, 10);
          var user = {};
          user.password = passwordHash;
          await Users.updateOne({ _id: id }, user);
          Users.findOneAndUpdate({ _id: id }, async function (err, result) {
            if (err || !result) {
              return res
                .status(422)
                .json(responseData("DATA_NOT_FOUND", {}, 422));
            } else {
              /**
               * Send Email
               */
              var message =
                "Your password has been changed successfully by administrator";

              var options = await email_service.getEmailTemplateBySlug(
                "notification"
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
              options.description = _.replace(
                options.description,
                "[ACTION]",
                message
              );
              options.toEmail = result.email;
              sendMail(options);
            }
          });

          return res.json(responseData("ADMIN_PASSWORD_UPDATE"));
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  create: async (req, res) => {
    try {
      const { first_name, last_name, email, mobile_number, password } =
        req.body;
      const files = req.files;
      const passwordHash = bcrypt.hashSync(password, 10);

      var user = new Users();
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      user.role_id = 2;
      user.otp_status = 1;
      user.status = 1;
      user.image = null;
      user.old_image = null;
      user.password = passwordHash;
      user.mobile_number = mobile_number;
      user.device_type = "web";
      user.device_token = "373a1d-230-fc80-6872-f2b0c1d4e78";

      user.save(async function (err, result) {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message;
            return res.status(422).json(responseData(str, {}, 422));
          }
        } else {
          /**
           * Send Email
           */
          if (files && files.image.name != undefined) {
            var profile = await saveFile(
              files.image,
              config.USER_IMAGE,
              result.old_image
            );
            await saveThumbFile(
              files.image,
              config.USER_IMAGE,
              result.old_image,
              profile,
              config.USER_HEIGHT,
              config.USER_WIDTH,
              config.USER_THUMB
            );
            var user = {};
            user.image = profile;
            user.old_image = profile;
            await Users.updateOne({ _id: result._id }, user);
          }

          var options = await email_service.getEmailTemplateBySlug(
            "this-email-is-sent-to-when-a-new-user-registered"
          );
          options.description = _.replace(
            options.description,
            "[FirstName]",
            first_name
          );
          options.description = _.replace(
            options.description,
            "[LastName]",
            last_name
          );
          options.description = _.replace(
            options.description,
            "[EMAIL]",
            email
          );
          options.description = _.replace(
            options.description,
            "[PASSWORD]",
            password
          );
          options.toEmail = email;
          sendMail(options);
          return res.json(responseData("REGISTRATION_DONE"));
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  update: async (req, res) => {
    try {
      const { first_name, last_name, email, mobile_number, id } = req.body;
      const files = req.files;
      Users.findOne({ _id: id }, async function (err, result) {
        if (err || !result) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422));
        } else {
          var updateObj = {};
          updateObj.first_name = first_name;
          updateObj.last_name = last_name;
          updateObj.email = email;
          updateObj.mobile_number = mobile_number;
          if (files && files.image.name != undefined) {
            var profile = await saveFile(
              files.image,
              config.USER_IMAGE,
              result.old_image
            );
            await saveThumbFile(
              files.image,
              config.USER_IMAGE,
              result.old_image,
              profile,
              config.USER_HEIGHT,
              config.USER_WIDTH,
              config.USER_THUMB
            );
            updateObj.image = profile;
            updateObj.old_image = profile;
          }
          await Users.findOneAndUpdate(
            { _id: id },
            updateObj,
            (err, result) => {
              if (err) {
                for (prop in err.errors) {
                  var str = err.errors[prop].message;
                  return res.status(422).json(responseData(str, {}, 422));
                }
              }
              Users.findOne({ _id: id }, async function (err, result) {
                if (err || !result) {
                  return res
                    .status(422)
                    .json(responseData("DATA_NOT_FOUND", {}, 422));
                } else {
                  /**
                   * Send Email
                   */
                  var message =
                    "Your account details has been successfully updated by administrator";

                  var options = await email_service.getEmailTemplateBySlug(
                    "notification"
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
                  options.description = _.replace(
                    options.description,
                    "[ACTION]",
                    message
                  );
                  options.toEmail = result.email;
                  sendMail(options);
                }
              });
              return res.json(responseData("ADMIN_UPDATE"));
            }
          );
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  process: async (req, res) => {
    try {
      let { id, status } = req.query;
      await Users.findOneAndUpdate(
        { _id: id },
        { status: status },
        async (err, result) => {
          Users.findOne({ _id: id }, async function (err, result) {
            if (err || !result) {
              return res
                .status(422)
                .json(responseData("DATA_NOT_FOUND", {}, 422));
            } else {
              /**
               * Send Email
               */
              var message =
                "Your account has been deactivated by administrator";
              if (parseInt(status)) {
                var message =
                  "Your account has been activated by administrator";
              }

              var options = await email_service.getEmailTemplateBySlug(
                "notification"
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
              options.description = _.replace(
                options.description,
                "[ACTION]",
                message
              );
              options.toEmail = result.email;
              sendMail(options);
            }
          });
          var stateMessage = "ADMIN_DEACTIVE_STATE";
          if (parseInt(status)) {
            var stateMessage = "ADMIN_ACTIVE_STATE";
          }
          return res.json(responseData(stateMessage));
        }
      );
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  delete: async (req, res) => {
    try {
      let { id } = req.query;
      await Users.updateOne(
        { _id: id },
        { isDeleted: true, deletedAt: new Date() },
        async (err, result) => {
          return res.json(responseData("ADMIN_DELETE"));
        }
      );
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
};
