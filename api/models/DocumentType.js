const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
var slug = require("mongoose-slug-updater");
const Schema = mongoose.Schema;

function ucFirst(v) {
  if (v) {
    return v[0].toUpperCase() + v.substring(1);
  }
  return true;
}

function status(val) {
  return val === 1 ? true : false;
}

const DocumentType = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, required: false },
    slug: { type: String, slug: "title", lowercase: true },
    isDeleted: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date, default: null },
    status: { type: Number, get: status, required: false, default: 1 },
    registration_group_id: {
      type: Schema.Types.ObjectId,
      ref: "RegistrationGroup",
    },
    extension: { type: Array, default: [] },
    type: {
      type: String,
      enum: ["Company", "Staff"],
      default: "Company",
      get: ucFirst,
    },
    documentType: {
      type: String,
      enum: ["Company", "Staff"],
      default: "Company",
      get: ucFirst,
    },
    isOther: { type: Boolean, required: true, default: false },
    isIdDocument: { type: Boolean, required: true, default: false },
    id_document_type: {
      type: String,
      enum: ["Primary", "Secondary"],
      default: "Primary",
      get: ucFirst,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
DocumentType.set("toObject", { getters: true });
DocumentType.set("toJSON", { getters: true });

DocumentType.plugin(mongoosePaginate);
DocumentType.plugin(slug),
  (module.exports = mongoose.model("DocumentType", DocumentType));
