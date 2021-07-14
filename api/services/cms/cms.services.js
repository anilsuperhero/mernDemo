const Cms = require("../../models/Cms")
const ContactUs = require("../../models/ContactUs")
const { responseData } = require("../../helpers/responseData")
const { sendMail } = require("../../helpers/helpers")
const { response } = require("../../resources/response")
const _ = require("lodash")
var email_service = require("../email/email.services")
var setting_service = require("../setting/settings.services")

module.exports = {
  index: async (req, res) => {
    try {
      let { page, sort, direction, keyword } = req.query
      const sortOptions = {
        [sort || "created_at"]: direction === "desc" ? 1 : -1,
      }
      const options = {
        page: page || 1,
        limit: process.env.ADMIN_LIST_PAGING_LIMIT || 20,
        sort: sortOptions,
        select: ["title", "updated_at", "status", "slug", "content"],
      }
      var query = {}
      if (keyword) {
        query = { title: { $regex: _.trim(keyword), $options: "i" } }
      }
      Cms.paginate(query, options, async function (err, result) {
        if (err) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422))
        }
        const data = await response(result)
        return res.json(responseData("DATA_RECEIVED", data))
      })
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
  create: async (req, res) => {
    try {
      const { title, status, content } = req.body
      var createObj = new Cms()
      createObj.title = title
      createObj.meta_title = null
      createObj.meta_key = null
      createObj.meta_desc = null
      createObj.status = status
      createObj.content = content
      createObj.save(function (err) {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message
            return res.status(422).json(responseData(str, {}, 422))
          }
        } else {
          return res.json(responseData("CMS_CREATED"))
        }
      })
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
  delete: async (req, res) => {
    try {
      let { id } = req.query
      await Cms.deleteOne({ _id: id }, (err, result) => {
        return res.json(
          responseData("Record has been deleted successfully.", result)
        )
      })
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
  update: async (req, res) => {
    try {
      let { title, content, id, meta_title, meta_key, meta_desc } = req.body
      let updateObj = {}
      updateObj.title = title
      updateObj.content = content
      updateObj.meta_title = meta_title
      updateObj.meta_key = meta_key
      updateObj.meta_desc = meta_desc
      await Cms.findOneAndUpdate({ _id: id }, updateObj, (err, result) => {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message
            return res.status(422).json(responseData(str, {}, 422))
          }
        }
        return res.json(responseData("CMS_UPDATE"))
      })
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
  process: async (req, res) => {
    try {
      let { id, status } = req.query
      await Cms.findOneAndUpdate(
        { _id: id },
        { status: status },
        (err, result) => {
          return res.json(
            responseData("Record has been updated successfully.", result)
          )
        }
      )
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
  getPage: async (req, res) => {
    try {
      let { slug } = req.params
      const select = {
        title: 1,
        content: 1,
      }
      return await Cms.findOne({ slug: slug }, select, (err, result) => {
        return res.json(responseData("DATA_RECEIVED", result))
      })
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
  contactUs: async (req, res) => {
    try {
      const { first_name, last_name, mobile_number, email, message } = req.body
      var createObj = new ContactUs()
      createObj.first_name = first_name
      createObj.last_name = last_name
      createObj.email = email
      createObj.mobile_number = mobile_number
      createObj.message = message
      createObj.save(async function (err) {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message
            return res.status(422).json(responseData(str, {}, 422))
          }
        } else {
          /**
           * Send Email To Admin
           */
          var settingsData = await setting_service.getSettingsRow()

          var options = await email_service.getEmailTemplateBySlug(
            "admin-will-receive-this-email-when-there-is-a-new-contact-us-request"
          )
          options.description = _.replace(
            options.description,
            "[NAME]",
            settingsData.name
          )
          options.description = _.replace(
            options.description,
            "[CONTACT_US_LINK]",
            process.env.BASE_URL + "contact-us"
          )
          options.description = _.replace(
            options.description,
            "[LINK]",
            process.env.BASE_URL + "contact-us"
          )
          options.description = _.replace(
            options.description,
            "[SUPPORT_EMAIL]",
            settingsData.support_email
          )
          options.toEmail = settingsData.email
          sendMail(options)
          return res.json(responseData("CONTACT_REQUEST"))
        }
      })
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
  contactUsList: async (req, res) => {
    try {
      let { page, sort, direction, keyword } = req.query
      const sortOptions = {
        [sort || "created_at"]: direction === "desc" ? 1 : -1,
      }
      const options = {
        page: page || 1,
        limit: process.env.ADMIN_LIST_PAGING_LIMIT || 20,
        sort: sortOptions,
        select: [
          "first_name",
          "updated_at",
          "last_name",
          "email",
          "mobile_number",
          "message",
        ],
      }
      var query = {}
      if (keyword) {
        var terms = keyword.split(" ")

        for (var i = 0; i < terms.length; i++) {
          regexString += terms[i]
          if (i < terms.length - 1) regexString += "|"
        }
        query = {
          $or: [
            { first_name: { $regex: regexString, $options: "i" } },
            { last_name: { $regex: regexString, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
            { mobile_number: { $regex: keyword, $options: "i" } },
          ],
        }
      }
      ContactUs.paginate(query, options, async function (err, result) {
        if (err) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422))
        }
        const data = await response(result)
        return res.json(responseData("DATA_RECEIVED", data))
      })
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
  deleteContact: async (req, res) => {
    try {
      let { id } = req.query
      await ContactUs.deleteOne({ _id: id }, (err, result) => {
        return res.json(responseData("CONTACT_DELETE", result))
      })
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
}
