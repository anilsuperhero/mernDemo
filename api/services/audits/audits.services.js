const Audits = require("../../models/Audits");
const AuditLog = require("../../models/AuditLog");
const Promise = require("bluebird");
const { responseData } = require("../../helpers/responseData");
const Users = require("../../models/User");
const { response } = require("../../resources/response");
const config = require("../../config/config");
const {
  sendNotification,
  generateOTP,
  imageURL,
  documentURL,
  saveFile,
} = require("../../helpers/helpers");
const _ = require("lodash");

module.exports = {
  index: async (req, res) => {
    try {
      const CompanyId = req.user_id;
      const { page, sort, direction, keyword, status } = req.query;

      var regexString = "";
      const sortOptions = {
        [sort || "created_at"]: direction === "desc" ? 1 : -1,
      };
      const options = {
        page: page || 1,
        limit: process.env.ADMIN_LIST_PAGING_LIMIT || 20,
        sort: sortOptions,
        select: [
          "title",
          "audit_number",
          "type",
          "number_of_clients",
          "registration_group",
          "status",
          "size_of_company",
          "created_at",
          "updated_at",
          "sla_document",
          "sla_document_old",
          "amount",
          "advance_payment",
          "final_payment",
          "remarks",
          "status_view",
          "sla_document_sign",
          "sla_document_sign_old",
          "sla_document_name",
          "sla_document_sign_name",
          "isPayment",
          "invoice_number",
          "invoice_document_name",
          "invoice_document",
          "invoice_document_old",
          "is_advance",
          "is_final",
          "sign_type",
        ],
      };
      var query = { company_id: CompanyId };
      if (status) {
        query.status = status;
      }
      if (keyword) {
        var terms = keyword.split(" ");
        for (var i = 0; i < terms.length; i++) {
          regexString += terms[i];
          if (i < terms.length - 1) regexString += "|";
        }
        query = {
          $or: [
            { title: { $regex: regexString, $options: "i" } },
            { audit_number: { $regex: regexString, $options: "i" } },
          ],
        };
      }
      query.company_id = CompanyId;
      Audits.paginate(query, options, async function (err, result) {
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
      const request = req.body;
      const files = req.files;

      const CompanyId = request.company_id;
      const auditNumber = "" + generateOTP() + generateOTP();
      var audits = new Audits();

      audits.title = request.title;
      audits.company_id = CompanyId;
      audits.audit_number = auditNumber;
      audits.type = request.type;
      audits.size_of_company = request.size_of_company;
      audits.number_of_clients = request.number_of_clients;
      audits.remarks = request.remarks;
      audits.amount = request.amount;
      if (request.type === "CERTIFICATION") {
        audits.advance_payment = request.advance_payment;
        audits.final_payment = request.final_payment;
      }
      audits.registration_group = JSON.parse(request.registration_group);
      audits.selectedDocument = JSON.parse(request.selectedDocument);
      audits.invoice_number = request.invoice_number;
      audits.status = "SLAUPLOADED";
      audits.status_view = "SLAUPLOADED";

      if (files && files.sla_document.name != undefined) {
        var file = await saveFile(files.sla_document, config.DOCUMENT, "");
        audits.sla_document_name = files.sla_document.name;
        audits.sla_document = file;
        audits.sla_document_old = file;
      }

      if (files && files.invoice.name != undefined) {
        var file = await saveFile(files.invoice, config.DOCUMENT, "");
        audits.invoice_document_name = files.invoice.name;
        audits.invoice_document = file;
        audits.invoice_document_old = file;
      }

      await audits.save(async function (err, result) {
        if (err) {
          for (prop in err.errors) {
            var str = err.errors[prop].message;
            return res.status(422).json(responseData(str, {}, 422));
          }
        } else {
          /**
           * Save log
           */
          var auditLog = new AuditLog();
          auditLog.audit_id = result._id;
          auditLog.audit_number = result.audit_number;
          auditLog.company_id = result.company_id;
          auditLog.type = result.type.toUpperCase();
          auditLog.save();

          var auditLog = new AuditLog();
          auditLog.audit_id = result._id;
          auditLog.audit_number = result.audit_number;
          auditLog.company_id = result.company_id;
          auditLog.type = result.type.toUpperCase();
          auditLog.status = "SLAUPLOADED";
          auditLog.save();

          /**
           * Send email to user
           */
          var users = await Users.findOne({ _id: CompanyId });
          var message =
            "Admin has been create audit request and sent a SLA document. Your audit request reference number is #" +
            auditNumber;

          var notification = {};
          notification.user = users;
          notification.message = message;
          notification.action = "audit-request?type=pop";
          notification.title = "Audit Request";
          sendNotification(notification);

          return res.json(responseData("REQUEST_CREATED"));
        }
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  delete: async (req, res) => {
    try {
      let { id } = req.query;
      await Audits.deleteOne({ _id: id }, async (err, result) => {
        await AuditLog.deleteMany({ audit_id: id });
        return res.json(responseData("REQUEST_DELETE"));
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  indexAdmin: async (req, res) => {
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
        [sort || "updated_at"]: direction === "desc" ? 1 : -1,
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
            { title: { $regex: regexString, $options: "i" } },
            { type: { $regex: regexString, $options: "i" } },
            { audit_number: { $regex: regexString, $options: "i" } },
            { "users.company_name": { $regex: regexString, $options: "i" } },
          ],
        };
      }
      if (status) {
        match.status = {
          $in: [status],
        };
      }
      if (created_at_from && created_at_to) {
        match.updated_at = {
          $gte: new Date(created_at_from),
          $lte: new Date(created_at_to + "T23:59:00.000Z"),
        };
      } else if (created_at_from) {
        match.updated_at = {
          $gte: new Date(created_at_from + "T00:00:00.000Z"),
        };
      } else if (created_at_to) {
        match.updated_at = {
          $lte: new Date(created_at_to + "T23:59:00.000Z"),
        };
      }

      var query = Audits.aggregate([
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
            type: { $first: "$type" },
            registration_group: { $first: "$registration_group" },
            status: { $first: "$status" },
            status_view: { $first: "$status_view" },
            title: { $first: "$title" },
            audit_number: { $first: "$audit_number" },
            size_of_company: { $first: "$size_of_company" },
            number_of_clients: { $first: "$number_of_clients" },
            created_at: { $first: "$created_at" },
            updated_at: { $first: "$updated_at" },
            sla_document: { $first: "$sla_document" },
            sla_document_old: { $first: "$sla_document_old" },
            amount: { $first: "$amount" },
            advance_payment: { $first: "$advance_payment" },
            final_payment: { $first: "$final_payment" },
            sla_document_name: { $first: "$sla_document_name" },
            invoice_number: { $first: "$invoice_number" },
            invoice_document_name: { $first: "$invoice_document_name" },
            invoice_document: { $first: "$invoice_document" },
            invoice_document_old: { $first: "$invoice_document_old" },
            remarks: { $first: "$remarks" },
            sign_type: { $first: "$sign_type" },
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
      query.sort({ updated_at: -1 });

      var result = await Audits.aggregatePaginate(query, options);
      var data = await response(result);
      await Promise.map(data.data, async (item) => {
        var image = await imageURL(item.company.logo);
        var SLA_DOCUMENT = await documentURL(item.sla_document);
        var INVOICE = await documentURL(item.invoice_document);
        item.company.logo = image;
        item.sla_document = SLA_DOCUMENT;
        item.invoice_document = INVOICE;
        item.type =
          item.type === "VERIFICATION" ? "Verification" : "Certification";
        if (item.status_view === "CREATED") {
          item.status_view = "Audit Created";
        }
        if (item.status_view === "SLAUPLOADED") {
          item.status_view = "SLA Uploaded";
        }
        if (item.status_view === "SLASIGNED") {
          item.status_view = "SLA Signed";
        }
        if (item.sign_type === "DOCUSIGN") {
          item.sign_type = "DocuSign";
        }
        if (item.sign_type === "SELF") {
          item.sign_type = "Self";
        }
        return item;
      });
      return res.json(responseData("DATA_RECEIVED", data));
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  slaUpload: async (req, res) => {
    try {
      const {
        _id,
        amount,
        remarks,
        sla_document_old,
        final_payment,
        advance_payment,
      } = req.body;
      const files = req.files;
      await Audits.findOne({ _id: _id }, async (err, auditData) => {
        if (err) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422));
        }

        var request = {};
        request.amount = amount;
        if (auditData.type === "Verification") {
          request.advance_payment = advance_payment;
          request.final_payment = final_payment;
        }
        request.remarks = remarks;
        request.status = "SLAUPLOADED";
        request.status_view = "SLAUPLOADED";
        if (files && files.sla_document.name != undefined) {
          var file = await saveFile(
            files.sla_document,
            config.DOCUMENT,
            sla_document_old
          );
          request.sla_document_name = files.sla_document.name;
          request.sla_document = file;
          request.sla_document_old = file;
        }
        await Audits.updateOne({ _id: _id }, request);

        /**
         * Save log
         */
        var auditLog = new AuditLog();
        auditLog.audit_id = auditData._id;
        auditLog.audit_number = auditData.audit_number;
        auditLog.company_id = auditData.company_id;
        auditLog.type = auditData.type.toUpperCase();
        auditLog.status = "SLAUPLOADED";
        auditLog.save();

        /**
         * Send email to user
         */
        var users = await Users.findOne({ _id: auditData.company_id });
        var message =
          "Admin has been sent a SLA documents. Your audit request reference number is #" +
          auditData.audit_number;
        var notification = {};
        notification.user = users;
        notification.message = message;
        notification.action = "audit-request?type=pop";
        notification.title = "Audit Request";
        sendNotification(notification);

        return res.json(responseData("DOCUMENT_UPLOAD"));
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  slaSignature: async (req, res) => {
    try {
      const { _id, sla_document_sign_old } = req.body;
      const files = req.files;
      await Audits.findOne({ _id: _id }, async (err, auditData) => {
        if (err) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422));
        }
        var request = {};
        request.status = "SLASIGNED";
        request.status_view = "SLASIGNED";
        if (files && files.sla_document_sign.name != undefined) {
          var file = await saveFile(
            files.sla_document_sign,
            config.DOCUMENT,
            sla_document_sign_old
          );
          request.sla_document_sign_name = files.sla_document_sign.name;
          request.sla_document_sign = file;
          request.sla_document_sign_old = file;
          request.sign_type = "SELF";
        }
        await Audits.updateOne({ _id: _id }, request);

        /**
         * Save log
         */
        var auditLog = new AuditLog();
        auditLog.audit_id = auditData._id;
        auditLog.audit_number = auditData.audit_number;
        auditLog.company_id = auditData.company_id;
        auditLog.type = auditData.type.toUpperCase();
        auditLog.status = "SLASIGNED";
        auditLog.save();

        /**
         * Send email to admin
         */
        var users = await Users.findOne({ _id: auditData.company_id });
        var admin = await Users.findOne({ role_id: 1 });
        var message =
          users.company_name +
          " has been signed a SLA document for audit reference number is #" +
          auditData.audit_number;

        var notification = {};
        notification.user = admin;
        notification.message = message;
        notification.action = "audit-request?type=pop";
        notification.title = "Audit Request";
        sendNotification(notification);

        return res.json(responseData("DOCUMENT_SIGNED"));
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },

  docuSign: async (req, res) => {
    try {
      const { state } = req.query;
      const files = req.files;
      await Audits.findOne({ audit_number: state }, async (err, auditData) => {
        if (err) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422));
        }
        var request = {};
        request.status = "SLASIGNED";
        request.status_view = "SLASIGNED";
        request.sign_type = "DOCUSIGN";
        await Audits.updateOne({ _id: auditData._id }, request);

        /**
         * Save log
         */
        var auditLog = new AuditLog();
        auditLog.audit_id = auditData._id;
        auditLog.audit_number = auditData.audit_number;
        auditLog.company_id = auditData.company_id;
        auditLog.type = auditData.type.toUpperCase();
        auditLog.status = "SLASIGNED";
        auditLog.save();

        /**
         * Send email to admin
         */
        var users = await Users.findOne({ _id: auditData.company_id });
        var admin = await Users.findOne({ role_id: 1 });
        var message =
          users.company_name +
          " has been signed a SLA document using docusing for audit reference number is #" +
          auditData.audit_number;

        var notification = {};
        notification.user = admin;
        notification.message = message;
        notification.action = "audit-request?type=pop";
        notification.title = "Audit Request";
        sendNotification(notification);

        return res.json(responseData("DOCUMENT_SIGNED"));
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
};
