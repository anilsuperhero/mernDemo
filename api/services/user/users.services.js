const Users = require("../../models/User");
const { responseData } = require("../../helpers/responseData");
const bcrypt = require("bcryptjs");
const { saveFile, saveThumbFile } = require("../../helpers/helpers");
const config = require("../../config/config");

module.exports = {
  changePassword: async (req, res) => {
    try {
      const { current_password, password } = req.body;
      Users.findOne({ _id: req.user_id }, async function (err, result) {
        if (err || !result) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422));
        } else {
          const verified = bcrypt.compareSync(
            current_password,
            result.password
          );
          if (!verified) {
            return res
              .status(422)
              .json(responseData("CURRENT_PASSWORD_NOT_MATCH", {}, 422));
          } else {
            const passwordHash = bcrypt.hashSync(password, 10);
            var user = {};
            user.password = passwordHash;
            await Users.findOneAndUpdate(
              { _id: req.user_id },
              user,
              (err, result) => {
                if (err) {
                  for (prop in err.errors) {
                    var str = err.errors[prop].message;
                    return res.status(422).json(responseData(str, {}, 422));
                  }
                }
              }
            );
            return res.json(responseData("PASSWORD_UPDATE"));
          }
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  updateProfileAdmin: async (req, res) => {
    try {
      const { first_name, last_name, email, mobile_number } = req.body;
      const files = req.files;
      Users.findOne({ _id: req.user_id }, async function (err, result) {
        if (err || !result) {
          for (prop in err.errors) {
            var str = err.errors[prop].message;
            return res.status(422).json(responseData(str, {}, 422));
          }
        } else {
          var user = {};
          user.first_name = first_name;
          user.last_name = last_name;
          user.email = email;
          user.mobile_number = mobile_number;
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
            user.image = profile;
            user.old_image = profile;
          }
          await Users.findOneAndUpdate(
            { _id: req.user_id },
            user,
            (err, result) => {
              if (err) {
                for (prop in err.errors) {
                  var str = err.errors[prop].message;
                  return res.status(422).json(responseData(str, {}, 422));
                }
              }
            }
          );

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
          Users.findOne(
            { _id: req.user_id },
            select,
            async function (err, result) {
              if (err || !result) {
                return res
                  .status(422)
                  .json(responseData("DATA_NOT_FOUND", {}, 422));
              } else {
                return res.json(responseData("PROFILE_UPDATE", result));
              }
            }
          );
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  dashboard: async (req, res) => {
    try {
      const userCount = await Users.countDocuments({}).exec();
      return res.json(
        responseData("DATA_RECEIVED", {
          user: userCount,
          totalClient: 0,
          totalAuditor: 0,
          createdAudit: 0,
          completedAudit: 0,
          processAudit: 0,
        })
      );
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  updateProfileCompany: async (req, res) => {
    try {
      const {
        abn_number,
        address,
        address_line,
        city,
        first_name,
        last_name,
        mobile_number,
        postcode,
      } = req.body;
      const files = req.files;
      Users.findOne({ _id: req.user_id }, async function (err, result) {
        if (err || !result) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422));
        } else {
          var user = {};
          user.abn_number = abn_number;
          user.address = address;
          user.address_line = address_line;
          user.city = city;
          user.first_name = first_name;
          user.last_name = last_name;
          user.mobile_number = mobile_number;
          user.postcode = postcode;

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
            user.image = profile;
            user.old_image = profile;
          }
          await Users.findOneAndUpdate(
            { _id: req.user_id },
            user,
            (err, result) => {
              if (err) {
                for (prop in err.errors) {
                  var str = err.errors[prop].message;
                  return res.status(422).json(responseData(str, {}, 422));
                }
              }
            }
          );

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
          Users.findOne(
            { _id: req.user_id },
            select,
            async function (err, result) {
              if (err || !result) {
                return res
                  .status(422)
                  .json(responseData("DATA_NOT_FOUND", {}, 422));
              } else {
                return res.json(responseData("PROFILE_UPDATE", result));
              }
            }
          );
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  updateProfileAuditor: async (req, res) => {
    try {
      const { address, first_name, last_name, mobile_number } = req.body;
      const files = req.files;
      Users.findOne({ _id: req.user_id }, async function (err, result) {
        if (err || !result) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422));
        } else {
          var user = {};
          user.address = address;
          user.first_name = first_name;
          user.last_name = last_name;
          user.mobile_number = mobile_number;
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
            user.image = profile;
            user.old_image = profile;
          }
          await Users.findOneAndUpdate(
            { _id: req.user_id },
            user,
            (err, result) => {
              if (err) {
                for (prop in err.errors) {
                  var str = err.errors[prop].message;
                  return res.status(422).json(responseData(str, {}, 422));
                }
              }
            }
          );

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
          Users.findOne(
            { _id: req.user_id },
            select,
            async function (err, result) {
              if (err || !result) {
                return res
                  .status(422)
                  .json(responseData("DATA_NOT_FOUND", {}, 422));
              } else {
                return res.json(responseData("PROFILE_UPDATE", result));
              }
            }
          );
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
};
