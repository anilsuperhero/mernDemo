const DocumentType = require("../../models/DocumentType");
const { responseData } = require("../../helpers/responseData");
const { response } = require("../../resources/response");
const _ = require("lodash");

module.exports = {
  index: async (req, res) => {
    try {
      let { page, sort, direction, keyword, groupId, status } = req.query;
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
          "extension",
          "type",
        ],
      };
      var query = {
        registration_group_id: groupId,
        isDeleted: false,
        isOther: false,
      };
      if (status) {
        query.status = status;
      }
      if (keyword) {
        query.title = { $regex: _.trim(keyword), $options: "i" };
      }
      DocumentType.paginate(query, options, async function (err, result) {
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
      const { title, description, type, extension, registration_group_id } =
        req.body;
      var documentType = new DocumentType();
      documentType.title = title;
      documentType.registration_group_id = registration_group_id;
      documentType.type = type;
      documentType.extension = extension;
      documentType.description = description;
      documentType.save(function (err) {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message;
            return res.status(422).json(responseData(str, {}, 422));
          }
        } else {
          return res.json(responseData("DOCUMENT_CREATED"));
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  delete: async (req, res) => {
    try {
      let { id } = req.query;
      await DocumentType.remove({ _id: id }, (err, result) => {
        return res.json(responseData("DOCUMENT_TYPE_DELETE"));
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  update: async (req, res) => {
    try {
      let { title, description, type, extension, registration_group_id, id } =
        req.body;
      let updateObj = {};
      updateObj.title = title;
      updateObj.registration_group_id = registration_group_id;
      updateObj.type = type;
      updateObj.extension = extension;
      updateObj.description = description;
      await DocumentType.findOneAndUpdate(
        { _id: id },
        updateObj,
        (err, result) => {
          if (err) {
            for (prop in err.errors) {
              var str = err.errors[prop].message;
              return res.status(422).json(responseData(str, {}, 422));
            }
          }
          return res.json(responseData("DOCUMENT_UPDATE"));
        }
      );
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  process: async (req, res) => {
    try {
      let { id, status } = req.query;
      await DocumentType.findOneAndUpdate(
        { _id: id },
        { status: status },
        (err, result) => {
          var stateMessage = "DOCUMENT_TYPE_DEACTIVE_STATE";
          if (parseInt(status)) {
            var stateMessage = "DOCUMENT_TYPE_ACTIVE_STATE";
          }
          return res.json(responseData(stateMessage));
        }
      );
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
};
