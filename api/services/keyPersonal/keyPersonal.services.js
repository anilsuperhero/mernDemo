const KeyPersonal = require("../../models/keyPersonal");
const Promise = require("bluebird");
const Users = require("../../models/User");
const { responseData } = require("../../helpers/responseData");
const {
  sendMail,
  sendNotification,
  imageURL,
} = require("../../helpers/helpers");
const { response } = require("../../resources/response");
const _ = require("lodash");
var email_service = require("../email/email.services");

module.exports = {
  index: async (req, res) => {
    try {
      let { page, sort, direction, keyword } = req.query;
      const CompanyId = req.user_id;
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
          "middle_name",
          "last_name",
          "email",
          "dob",
          "mobile_number",
          "positionHeld",
          "state",
          "type",
          "created_at",
        ],
      };
      var query = { isDeleted: false, company_id: CompanyId };
      if (keyword && CompanyId) {
        var terms = keyword.split(" ");
        for (var i = 0; i < terms.length; i++) {
          regexString += terms[i];
          if (i < terms.length - 1) regexString += "|";
        }
        query = {
          $or: [
            { first_name: { $regex: regexString, $options: "i" } },
            { middle_name: { $regex: regexString, $options: "i" } },
            { last_name: { $regex: regexString, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
            { mobile_number: { $regex: keyword, $options: "i" } },
            { positionHeld: { $regex: regexString, $options: "i" } },
          ],
          company_id: CompanyId,
        };
      }
      KeyPersonal.paginate(query, options, async function (err, result) {
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
  create: async (req, res) => {
    try {
      const {
        first_name,
        middle_name,
        last_name,
        email,
        dob,
        mobile_number,
        positionHeld,
        type,
      } = req.body;
      const CompanyId = req.user_id;
      var users = await Users.findOne({ _id: CompanyId }).select({
        first_name: 1,
        last_name: 1,
        email: 1,
        company_name: 1,
        abn_number: 1,
        image: 1,
        _id: 1,
      });
      const keyPersonal = new KeyPersonal();
      keyPersonal.first_name = first_name;
      keyPersonal.middle_name = middle_name;
      keyPersonal.last_name = last_name;
      keyPersonal.email = email;
      keyPersonal.company_id = CompanyId;
      keyPersonal.status = 1;
      keyPersonal.dob = dob;
      keyPersonal.type = type;
      keyPersonal.positionHeld = positionHeld;
      keyPersonal.mobile_number = mobile_number;
      await keyPersonal.save(async function (err, result) {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message;
            return res.status(422).json(responseData(str, {}, 422));
          }
        }

        /**
         * Send notification
         */
        var message =
          "You have successfully created " +
          first_name +
          " " +
          last_name +
          " as key personnel.";
        var notification = {};
        notification.user = users;
        notification.message = message;
        notification.action = "user/key-person";
        notification.title = "Key Personnel";
        sendNotification(notification);

        var options = await email_service.getEmailTemplateBySlug(
          "this-email-is-sent-to-when-create-a-new-key-personnel"
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
          "[COMPANY_NAME]",
          users.company_name
        );
        options.toEmail = email;
        sendMail(options);
        return res.json(responseData("KEY_PERSONAL_CREATE"));
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  update: async (req, res) => {
    try {
      const {
        id,
        first_name,
        middle_name,
        last_name,
        email,
        dob,
        mobile_number,
        positionHeld,
        type,
        status,
      } = req.body;
      KeyPersonal.findOne({ _id: id }, async function (err, result) {
        if (err || !result) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422));
        } else {
          var updateObj = {};
          updateObj.first_name = first_name;
          updateObj.middle_name = middle_name;
          updateObj.last_name = last_name;
          updateObj.email = email;
          updateObj.mobile_number = mobile_number;
          updateObj.dob = dob;
          updateObj.positionHeld = positionHeld;
          updateObj.status = status;
          updateObj.type = type;
          await KeyPersonal.findOneAndUpdate(
            { _id: id },
            updateObj,
            (err, result) => {
              if (err) {
                for (prop in err.errors) {
                  var str = err.errors[prop].message;
                  return res.status(422).json(responseData(str, {}, 422));
                }
              }
              KeyPersonal.findOne({ _id: id }, async function (err, result) {
                if (err || !result) {
                  return res
                    .status(422)
                    .json(responseData("DATA_NOT_FOUND", {}, 422));
                } else {
                  /**
                   * Send Email
                   */
                  let message =
                    "Your account details has been updated successfully.";
                  let options = await email_service.getEmailTemplateBySlug(
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
              return res.json(responseData("KEY_PERSONAL_UPDATE"));
            }
          );
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  delete: async (req, res) => {
    try {
      let { id } = req.query;
      await KeyPersonal.remove({ _id: id }, (err, result) => {
        return res.json(responseData("KEY_PERSONAL_DELETE", result));
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  indexAdmin: async (req, res) => {
    try {
      let { page, sort, direction, keyword } = req.query;
      keyword = _.trim(keyword);
      var regexString = "";
      const sortOptions = {
        [sort || "created_at"]: direction === "desc" ? 1 : -1,
      };
      const options = {
        page: page || 1,
        limit: process.env.ADMIN_LIST_PAGING_LIMIT || 20,
        sort: sortOptions,
      };
      var match = {};

      if (keyword) {
        var terms = keyword.split(" ");
        for (var i = 0; i < terms.length; i++) {
          regexString += terms[i];
          if (i < terms.length - 1) regexString += "|";
        }
        match = {
          $or: [
            { first_name: { $regex: regexString, $options: "i" } },
            { middle_name: { $regex: regexString, $options: "i" } },
            { last_name: { $regex: regexString, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
            { positionHeld: { $regex: regexString, $options: "i" } },
            { "users.company_name": { $regex: regexString, $options: "i" } },
          ],
        };
      }
      match.isDeleted = false;

      var query = KeyPersonal.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "company_id",
            foreignField: "_id",
            as: "users",
          },
        },
        { $unwind: "$users" },
        { $match: match },
        {
          $group: {
            _id: "$_id",
            first_name: { $first: "$first_name" },
            middle_name: { $first: "$middle_name" },
            last_name: { $first: "$last_name" },
            email: { $first: "$email" },
            dob: { $first: "$dob" },
            positionHeld: { $first: "$positionHeld" },
            mobile_number: { $first: "$mobile_number" },
            created_at: { $first: "$created_at" },
            company: {
              $first: {
                name: "$users.company_name",
                abn_number: "$users.abn_number",
                logo: "$users.image",
              },
            },
          },
        },
      ]);
      query.sort({ created_at: -1 });
      var result = await KeyPersonal.aggregatePaginate(query, options);
      var data = await response(result);
      await Promise.map(data.data, async (item) => {
        var image = await imageURL(item.company.logo);
        item.company.logo = image;
        return item;
      });
      return res.json(responseData("DATA_RECEIVED", data));
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
};
