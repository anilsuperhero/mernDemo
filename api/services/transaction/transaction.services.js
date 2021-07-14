const Transactions = require("../../models/Transaction");
const Audits = require("../../models/Audits");
const AuditLog = require("../../models/AuditLog");
const Users = require("../../models/User");
const { responseData } = require("../../helpers/responseData");
const {
  sendMailAttachments,
  generateOTP,
  sendNotification,
  documentInvoice,
} = require("../../helpers/helpers");
const { response } = require("../../resources/response");
const _ = require("lodash");
var email_service = require("../email/email.services");
const config = require("../../config/config");
const moment = require("moment");
var setting_service = require("../setting/settings.services");
const Promise = require("bluebird");
const mongoose = require("mongoose");

module.exports = {
  index: async (req, res) => {
    try {
      const CompanyId = new mongoose.Types.ObjectId(req.user_id);
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
            { reciptNumber: { $regex: regexString, $options: "i" } },
            { "users.company_name": { $regex: regexString, $options: "i" } },
            { "audits.audit_number": { $regex: regexString, $options: "i" } },
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

      match.companyId = CompanyId;
      console.log("match ==>", match);
      var query = Transactions.aggregate([
        {
          $lookup: {
            from: "auditrequests",
            localField: "auditId",
            foreignField: "_id",
            as: "audits",
          },
        },
        { $unwind: "$audits" },
        { $match: match },
        {
          $group: {
            _id: "$_id",
            reciptNumber: { $first: "$reciptNumber" },
            transactionType: { $first: "$transactionType" },
            amount: { $first: "$amount" },
            status: { $first: "$status" },
            remarks: { $first: "$remarks" },
            paymentId: { $first: "$paymentId" },
            audits: {
              $first: {
                audit_number: "$audits.audit_number",
                title: "$audits.title",
                type: "$audits.type",
                invoice_number: "$audits.invoice_number",
              },
            },
          },
        },
      ]);
      query.sort({ updated_at: -1 });
      var result = await Transactions.aggregatePaginate(query, options);
      var data = await response(result);
      await Promise.map(data.data, async (item) => {
        var INVOICE = await documentInvoice(item._id + ".pdf");
        item.audits.type =
          item.audits.type === "VERIFICATION"
            ? "Verification"
            : "Certification";
        item.transactionType =
          item.transactionType === "ONLINE" ? "Online" : "Bank Transfer";
        item.invoice = INVOICE;
        return item;
      });
      return res.json(responseData("DATA_RECEIVED", data));
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  create: async (req, res) => {
    try {
      const { id, token, type, amount } = req.body;
      const reciptNumber = "" + generateOTP() + generateOTP();
      await Audits.findOne({ _id: id }, async (err, auditData) => {
        if (err) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422));
        }
        var users = await Users.findOne({ _id: auditData.company_id });
        const stripe = require("stripe")(process.env.STRIPE_KEY);
        const customer = await stripe.customers.create({
          email: users.email,
          name: users.company_name,
          phone: users.mobile_number,
        });
        const charge = {
          payment_method: token,
          amount: parseInt(amount) * 100,
          currency: process.env.CURRENCY,
          confirmation_method: "manual",
          description:
            "Payment for " +
            auditData.type +
            " audit, Invoice No " +
            auditData.invoice_number,
          confirm: true,
          customer: customer.id,
          receipt_email: users.email,
          customer: customer.id,
        };
        stripe.paymentIntents.create(charge, async (error, data) => {
          if (error) {
            return res.status(422).json(responseData(error.message, {}, 422));
          } else {
            const transactions = new Transactions();
            transactions.companyId = auditData.company_id;
            transactions.reciptNumber = reciptNumber;
            transactions.auditId = id;
            transactions.amount = amount;
            transactions.transactionType = type;
            transactions.status = "PAID";
            transactions.paymentId = data.id;
            await transactions.save(async function (err, result) {
              if (err) {
                for (prop in err.errors) {
                  var str = err.errors[prop].message;
                  return res.status(422).json(responseData(str, {}, 422));
                }
              }

              /**
               * Update audit
               */
              if (auditData.type === "Verification") {
                await Audits.updateOne(
                  { _id: auditData._id },
                  {
                    isPayment: 1,
                    is_advance: 1,
                    is_final: 1,
                    status: "PROGRESS",
                  }
                );
              } else {
                await Audits.updateOne(
                  { _id: auditData._id },
                  { isPayment: 1, is_advance: 1, status: "PROGRESS" }
                );
              }

              var admin = await Users.findOne({ role_id: 1 });

              /**
               * Save log
               */
              var auditLog = new AuditLog();
              auditLog.audit_id = auditData._id;
              auditLog.audit_number = auditData.audit_number;
              auditLog.company_id = auditData.company_id;
              auditLog.type = auditData.type.toUpperCase();
              auditLog.status = "PROGRESS";
              auditLog.save();

              /**
               * Send email admin
               */
              var message =
                users.company_name +
                " has paid audit charges for reference number #" +
                auditData.audit_number;
              var notification = {};
              notification.user = admin;
              notification.message = message;
              notification.action = "audit-request?type=pop";
              notification.title = "Audit Request";
              sendNotification(notification);

              /**
               * Create invoice
               */
              var invoiceURl = process.env.INVOICE_URL + result._id;
              var wkhtmltopdf = require("wkhtmltopdf");
              var fs = require("fs");
              wkhtmltopdf(invoiceURl, { pageSize: "letter" }).pipe(
                fs.createWriteStream("public/invoices/" + result._id + ".pdf")
              );

              /**
               * Send mail to customer
               */
              var options = await email_service.getEmailTemplateBySlug(
                "payment-successful"
              );
              options.description = _.replace(
                options.description,
                "[FirstName]",
                users.first_name
              );
              options.description = _.replace(
                options.description,
                "[LastName]",
                users.last_name
              );
              options.toEmail = users.email;
              options.attachments = [
                {
                  filename: result._id + ".pdf",
                  path: "public/invoices/" + result._id + ".pdf",
                },
              ];
              sendMailAttachments(options);

              return res.json(responseData("PAYMENT_CREATE"));
            });
          }
        });
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  transfer: async (req, res) => {
    try {
      const { id, type, amount, remarks } = req.body;
      const reciptNumber = "" + generateOTP() + generateOTP();
      await Audits.findOne({ _id: id }, async (err, auditData) => {
        if (err) {
          return res.status(422).json(responseData("DATA_NOT_FOUND", {}, 422));
        }
        var users = await Users.findOne({ _id: auditData.company_id });

        const transactions = new Transactions();
        transactions.companyId = auditData.company_id;
        transactions.reciptNumber = reciptNumber;
        transactions.auditId = id;
        transactions.amount = amount;
        transactions.transactionType = type;
        transactions.remarks = remarks;
        transactions.status = "PAID";
        await transactions.save(async function (err, result) {
          if (err) {
            for (prop in err.errors) {
              var str = err.errors[prop].message;
              return res.status(422).json(responseData(str, {}, 422));
            }
          }

          /**
           * Update audit
           */
          if (auditData.type === "Verification") {
            await Audits.updateOne(
              { _id: auditData._id },
              {
                isPayment: 1,
                is_advance: 1,
                is_final: 1,
                status: "PROGRESS",
              }
            );
          } else {
            await Audits.updateOne(
              { _id: auditData._id },
              { isPayment: 1, is_advance: 1, status: "PROGRESS" }
            );
          }

          var admin = await Users.findOne({ role_id: 1 });

          /**
           * Save log
           */
          var auditLog = new AuditLog();
          auditLog.audit_id = auditData._id;
          auditLog.audit_number = auditData.audit_number;
          auditLog.company_id = auditData.company_id;
          auditLog.type = auditData.type.toUpperCase();
          auditLog.status = "PROGRESS";
          auditLog.save();

          /**
           * Send email admin
           */
          var message =
            users.company_name +
            " has paid audit charges for reference number #" +
            auditData.audit_number;
          var notification = {};
          notification.user = admin;
          notification.message = message;
          notification.action = "audit-request?type=pop";
          notification.title = "Audit Request";
          sendNotification(notification);

          /**
           * Create invoice
           */
          var invoiceURl = process.env.INVOICE_URL + result._id;
          var wkhtmltopdf = require("wkhtmltopdf");
          var fs = require("fs");
          wkhtmltopdf(invoiceURl, { pageSize: "letter" }).pipe(
            fs.createWriteStream("public/invoices/" + result._id + ".pdf")
          );

          /**
           * Send mail to customer
           */
          var options = await email_service.getEmailTemplateBySlug(
            "payment-successful"
          );
          options.description = _.replace(
            options.description,
            "[FirstName]",
            users.first_name
          );
          options.description = _.replace(
            options.description,
            "[LastName]",
            users.last_name
          );
          options.toEmail = users.email;
          options.attachments = [
            {
              filename: result._id + ".pdf",
              path: "public/invoices/" + result._id + ".pdf",
            },
          ];
          sendMailAttachments(options);
          return res.json(responseData("PAYMENT_CREATE"));
        });
      });
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
  invoice: async (req, res) => {
    let { listingId } = req.query;
    const response = await Transactions.findOne({ _id: listingId })
      .populate(
        "companyId",
        "email mobile_number company_name address city postcode state"
      )
      .populate("auditId", "title invoice_number audit_number");
    const settingsData = await setting_service.getSettingsRow();
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: process.env.CURRENCY,
    });
    var message =
      "Your payment has been successfully completed for audit no #" +
      response.auditId.audit_number +
      ", payment id: #" +
      response.paymentId;
    if (response.transactionType === "BANKTRANSFER") {
      var message =
        "Your payment has been successfully completed for audit no #" +
        response.auditId.audit_number;
    }

    res.render("index", {
      response: response,
      settingsData: settingsData,
      amount: formatter.format(response.amount),
      message: message,
      moment: moment,
    });
  },
  adminIndex: async (req, res) => {
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
            { reciptNumber: { $regex: regexString, $options: "i" } },
            { "users.company_name": { $regex: regexString, $options: "i" } },
            { "audits.audit_number": { $regex: regexString, $options: "i" } },
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

      var query = Transactions.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "companyId",
            foreignField: "_id",
            as: "users",
          },
        },
        { $unwind: "$users" },
        {
          $lookup: {
            from: "auditrequests",
            localField: "auditId",
            foreignField: "_id",
            as: "audits",
          },
        },
        { $unwind: "$audits" },
        { $match: match },
        {
          $group: {
            _id: "$_id",
            reciptNumber: { $first: "$reciptNumber" },
            transactionType: { $first: "$transactionType" },
            amount: { $first: "$amount" },
            status: { $first: "$status" },
            remarks: { $first: "$remarks" },
            paymentId: { $first: "$paymentId" },
            company: {
              $first: {
                name: "$users.company_name",
                abn_number: "$users.abn_number",
                logo: "$users.image",
              },
            },
            audits: {
              $first: {
                audit_number: "$audits.audit_number",
                title: "$audits.title",
                type: "$audits.type",
                invoice_number: "$audits.invoice_number",
              },
            },
          },
        },
      ]);
      query.sort({ updated_at: -1 });
      var result = await Transactions.aggregatePaginate(query, options);
      var data = await response(result);
      await Promise.map(data.data, async (item) => {
        var INVOICE = await documentInvoice(item._id + ".pdf");
        item.audits.type =
          item.audits.type === "VERIFICATION"
            ? "Verification"
            : "Certification";
        item.transactionType =
          item.transactionType === "ONLINE" ? "Online" : "Bank Transfer";
        item.invoice = INVOICE;
        return item;
      });
      return res.json(responseData("DATA_RECEIVED", data));
    } catch (err) {
      return res.status(422).json(responseData(err.message, {}, 422));
    }
  },
};
