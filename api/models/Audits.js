const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Unique = require("mongoose-beautiful-unique-validation");
var slug = require("mongoose-slug-updater");
var Schema = mongoose.Schema;
const config = require("../config/config");
const fs = require("fs");

function ucFirst(v) {
  return v[0].toUpperCase() + v.substring(1);
}

function getType(v) {
  return v === "VERIFICATION" ? "Verification" : "Certification";
}

function getStatus(v) {
  if (v === "CREATED") {
    return "Audit Created";
  }
  if (v === "SLAUPLOADED") {
    return "SLA Uploaded";
  }
  if (v === "SLASIGNED") {
    return "SLA Signed";
  }
}

function status(val) {
  return val === 1 ? true : false;
}

function documentURL(image) {
  const path = config.DOCUMENT_PATH + "/" + image;
  if (fs.existsSync(path)) {
    return process.env.API_PATH + config.DOCUMENT_IMAGE_PATH + "/" + image;
  } else {
    return null;
  }
}

const AuditRequestSchema = mongoose.Schema(
  {
    title: { type: String, get: ucFirst, required: true },
    slug: { type: String, slug: "title", lowercase: true },
    audit_number: { type: String, required: false },
    company_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["VERIFICATION", "CERTIFICATION"],
      get: getType,
      default: "VERIFICATION",
    },
    size_of_company: { type: Number, required: true },
    number_of_clients: { type: Number, required: true },
    registration_group: { type: Array, default: [] },
    selectedDocument: { type: Array, default: [] },
    status_view: {
      type: String,
      enum: [
        "CREATED",
        "SLAUPLOADED",
        "SLASIGNED",
        "PROGRESS",
        "COMPLETED",
        "CLOSED",
      ],
      get: getStatus,
      default: "CREATED",
    },
    status: {
      type: String,
      enum: [
        "CREATED",
        "SLAUPLOADED",
        "SLASIGNED",
        "PROGRESS",
        "COMPLETED",
        "CLOSED",
      ],
      default: "CREATED",
    },
    sla_document: { type: String, get: documentURL, required: false },
    sla_document_name: { type: String, required: false },
    sla_document_old: { type: String, required: false },
    sla_document_sign: { type: String, get: documentURL, required: false },
    sla_document_sign_name: { type: String, required: false },
    sla_document_sign_old: { type: String, required: false },
    amount: { type: Number, required: false },
    advance_payment: { type: Number, required: false },
    final_payment: { type: Number, required: false },
    remarks: { type: String, required: false },
    invoice_number: { type: Number, required: false },
    invoice_document: { type: String, get: documentURL, required: false },
    invoice_document_name: { type: String, required: false },
    invoice_document_old: { type: String, required: false },
    isPayment: { type: Number, required: false, get: status, default: 0 },
    is_advance: { type: Number, required: false, get: status, default: 0 },
    is_final: { type: Number, required: false, get: status, default: 0 },
    sign_type: {
      type: String,
      enum: ["SELF", "DOCUSIGN", "NO"],
      default: "NO",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: { getters: true, setters: true, virtuals: false },
    toJSON: { getters: true, setters: true, virtuals: false },
  }
);

AuditRequestSchema.set("toObject", { getters: true });
AuditRequestSchema.set("toJSON", { getters: true });
AuditRequestSchema.plugin(Unique);
AuditRequestSchema.plugin(mongoosePaginate);
AuditRequestSchema.plugin(aggregatePaginate);
AuditRequestSchema.plugin(slug),
  (module.exports = mongoose.model("AuditRequest", AuditRequestSchema));
