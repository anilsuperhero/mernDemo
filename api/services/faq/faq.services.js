const Faq = require("../../models/Faq")
const { responseData } = require("../../helpers/responseData")
const { response } = require("../../resources/response")
const _ = require("lodash")

module.exports = {
  index: async (req, res) => {
    try {
      let { page, sort, direction, keyword, status } = req.query
      const sortOptions = {
        [sort || "created_at"]: direction === "desc" ? 1 : -1,
      }
      const options = {
        page: page || 1,
        limit: process.env.ADMIN_LIST_PAGING_LIMIT || 20,
        sort: sortOptions,
        select: ["title", "updated_at", "status", "slug", "description"],
      }
      var query = {}
      if (keyword) {
        query = { title: { $regex: _.trim(keyword), $options: "i" } }
      }
      if (status) {
        query.status = status
      }
      Faq.paginate(query, options, async function (err, result) {
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
      const { title, description } = req.body
      var faq = new Faq()
      faq.title = title
      faq.status = 1
      faq.description = description
      faq.save(function (err) {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message
            return res.status(422).json(responseData(str, {}, 422))
          }
        } else {
          return res.json(responseData("FAQ_CREATED"))
        }
      })
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
  delete: async (req, res) => {
    try {
      let { id } = req.query
      await Faq.remove({ _id: id }, (err, result) => {
        return res.json(responseData("FAQ_DELETE", result))
      })
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
  update: async (req, res) => {
    try {
      let { title, description, id } = req.body
      let updateObj = {}
      updateObj.title = title
      updateObj.description = description
      await Faq.findOneAndUpdate({ _id: id }, updateObj, (err, result) => {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message
            return res.status(422).json(responseData(str, {}, 422))
          }
        }
        return res.json(responseData("FAQ_UPDATE"))
      })
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
  process: async (req, res) => {
    try {
      let { id, status } = req.query
      await Faq.findOneAndUpdate(
        { _id: id },
        { status: status },
        (err, result) => {
          var stateMessage = "FAQ_DEACTIVE_STATE"
          if (parseInt(status)) {
            var stateMessage = "FAQ_ACTIVE_STATE"
          }
          return res.json(responseData(stateMessage))
        }
      )
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
  getList: async (req, res) => {
    try {
      const select = {
        title: 1,
        description: 1,
      }
      return await Faq.find({ status: 1 }, select, (err, result) => {
        return res.json(responseData("DATA_RECEIVED", result))
      })
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422))
    }
  },
}
