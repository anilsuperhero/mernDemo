const RegistrationGroup = require("../../models/RegistrationGroup");
const DocumentType = require("../../models/DocumentType");
const Users = require("../../models/User");
const { responseData } = require("../../helpers/responseData");
const { response } = require("../../resources/response");
const _ = require("lodash");
const Promise = require("bluebird");

module.exports = {
  index: async (req, res) => {
    try {
      let { page, sort, direction, keyword, status } = req.query;
      const sortOptions = {
        [sort || "created_at"]: direction === "desc" ? 1 : -1,
      };
      const options = {
        page: page || 1,
        limit: process.env.ADMIN_LIST_PAGING_LIMIT || 20,
        sort: sortOptions,
        select: ["title", "updated_at", "status", "slug"],
      };
      var query = { isDeleted: false };
      if (status) {
        query.status = status;
      }
      if (keyword) {
        query = { title: { $regex: _.trim(keyword), $options: "i" } };
      }
      RegistrationGroup.paginate(query, options, async function (err, result) {
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
      const { title } = req.body;
      var createObj = new RegistrationGroup();
      createObj.title = title;
      createObj.save(function (err) {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message;
            return res.status(422).json(responseData(str, {}, 422));
          }
        } else {
          return res.json(responseData("GROUP_CREATED"));
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  delete: async (req, res) => {
    try {
      let { id } = req.query;
      await RegistrationGroup.remove({ _id: id }, (err, result) => {
        return res.json(responseData("REGISTRATIION_DELETE"));
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  update: async (req, res) => {
    try {
      let { title, id } = req.body;
      let updateObj = {};
      updateObj.title = title;
      await RegistrationGroup.findOneAndUpdate(
        { _id: id },
        updateObj,
        (err) => {
          if (err) {
            for (prop in err.errors) {
              var str = err.errors[prop].message;
              return res.status(422).json(responseData(str, {}, 422));
            }
          }
          return res.json(responseData("GROUP_UPDATE"));
        }
      );
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  process: async (req, res) => {
    try {
      let { id, status } = req.query;
      await RegistrationGroup.findOneAndUpdate(
        { _id: id },
        { status: status },
        (err, result) => {
          var stateMessage = "REGISTRATIION_DEACTIVE_STATE";
          if (parseInt(status)) {
            var stateMessage = "REGISTRATIION_ACTIVE_STATE";
          }
          return res.json(responseData(stateMessage));
        }
      );
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  getList: async (req, res) => {
    try {
      const documentType = await DocumentType.find({ status: 1 })
        .sort({ name: 1 })
        .select({ _id: 1, title: 1, extension: 1, type: 1 })
        .populate("registration_group_id", "title")
        .lean();
      const registrationArray = [];
      var itemsObj = {};
      for (var i = 0; i < documentType.length; i++) {
        var item = documentType[i].registration_group_id;
        if (!itemsObj[item._id]) {
          itemsObj[item._id] = item._id;
          registrationArray.push(item._id);
        }
      }
      const registration = await RegistrationGroup.aggregate([
        {
          $lookup: {
            from: "documenttypes",
            localField: "_id",
            foreignField: "registration_group_id",
            as: "document",
          },
        },
        { $unwind: "$document" },
        {
          $match: { status: 1, _id: { $in: registrationArray } },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            "document._id": 1,
            "document.extension": 1,
            "document.type": 1,
            "document.title": 1,
          },
        },
        {
          $group: {
            _id: "$_id",
            title: { $first: "$title" },
            document: { $push: "$document" },
          },
        },
      ]);

      await Promise.map(registration, async (item) => {
        var document = item.document;
        console.log(document);
        var rows = [];
        for (var i = 0; i < document.length; i++) {
          var data = document[i];
          var obj = {};
          obj._id = item._id;
          obj.title = item.title;
          data.registration_group_id = obj;
        }
        return item;
      });

      const company = await Users.find({ status: 1, role_id: 3 })
        .sort({ company_name: 1 })
        .select({ _id: 1, company_name: 1, abn_number: 1 })
        .lean();
      await Promise.map(company, async (item) => {
        item.title = item.company_name + "( " + item.abn_number + " )";
        return item;
      });
      return res.json(
        responseData("DATA_RECEIVED", {
          registration: registration,
          company: company,
          documentType: documentType,
        })
      );
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
};
