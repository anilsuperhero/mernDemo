const Email = require("../../models/Email");
const { responseData } = require("../../helpers/responseData");
const { response } = require("../../resources/response");
const fs = require("fs");
const util = require("util");
const _ = require("lodash");
var setting_service = require("../setting/settings.services");

module.exports = {
  index: async (req, res) => {
    try {
      let { page, sort, direction, keyword } = req.query;
      const sortOptions = {
        [sort || "created_at"]: direction === "desc" ? 1 : -1,
      };
      const options = {
        page: page || 1,
        limit: process.env.ADMIN_LIST_PAGING_LIMIT || 20,
        sort: sortOptions,
        select: [
          "title",
          "updated_at",
          "status",
          "slug",
          "description",
          "subject",
          "keyword",
          "globalHeader",
          "globalFooter",
        ],
      };
      var query = {};
      if (keyword) {
        query = { title: { $regex: _.trim(keyword), $options: "i" } };
      }
      Email.paginate(query, options, async function (err, result) {
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
        title,
        status,
        description,
        subject,
        keyword,
        globalHeader,
        globalFooter,
      } = req.body;
      var createObj = new Email();
      createObj.title = title;
      createObj.status = status;
      createObj.description = description;
      createObj.subject = subject;
      createObj.keyword = keyword;
      createObj.globalHeader = globalHeader;
      createObj.globalFooter = globalFooter;

      createObj.save(function (err) {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message;
            return res.status(422).json(responseData(str, {}, 422));
          }
        } else {
          return res.json(responseData("EMAIL_CREATED"));
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  delete: async (req, res) => {
    try {
      let { id } = req.query;
      await Email.deleteOne({ _id: id }, (err, result) => {
        return res.json(
          responseData("Record has been deleted successfully.", result)
        );
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  update: async (req, res) => {
    try {
      let { title, description, subject, id, globalHeader, globalFooter } =
        req.body;

      let updateObj = {};
      updateObj.title = title;
      updateObj.description = description;
      updateObj.subject = subject;
      updateObj.globalHeader = globalHeader;
      updateObj.globalFooter = globalFooter;
      await Email.findOneAndUpdate({ _id: id }, updateObj, (err) => {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message;
            return res.status(422).json(responseData(str, {}, 422));
          }
        }
        return res.json(responseData("EMAIL_UPDATE"));
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  process: async (req, res) => {
    try {
      let { id, status } = req.query;
      await Email.findOneAndUpdate(
        { _id: id },
        { status: status },
        (err, result) => {
          return res.json(
            responseData("Record has been updated successfully.", result)
          );
        }
      );
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  getBySlug: async (req, res) => {
    try {
      let { slug } = req.query;
      return await Email.findOne({ slug: slug }, (err, result) => {
        return res.json(
          responseData("Record has been retrieved successfully.", result)
        );
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  getEmailTemplateBySlug: async (slug) => {
    try {
      let data = { subject: "", description: "" };
      let header = "",
        footer = "";
      return await Email.findOne({ slug: slug }) // Notice the return here
        .exec()
        .then(async (result) => {
          if (result !== null && result !== "") {
            data.subject = result.subject;
            data.description = result.description;
            const readFile = util.promisify(fs.readFile);
            return await readFile("email_layouts/general.html", "utf8").then(
              async (res) => {
                var settingsData = await setting_service.getSettingsRow();
                if (result.globalHeader == true) {
                  header = settingsData.email_header;
                }
                if (result.globalFooter == true) {
                  footer = settingsData.email_footer;
                }
                data.description = _.replace(
                  res,
                  "[LayoutContent]",
                  data.description
                );
                data.description = _.replace(
                  data.description,
                  "[Header]",
                  header
                );
                data.description = _.replace(
                  data.description,
                  "[Footer]",
                  footer
                );
                return data;
              }
            );
          } else {
            return data;
          }
        })
        .catch((err) => {
          return err.message;
        });
    } catch (err) {
      return err;
    }
  },
};
