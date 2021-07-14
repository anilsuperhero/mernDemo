const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Unique = require("mongoose-beautiful-unique-validation");
var slug = require("mongoose-slug-updater");

function ucFirst(v) {
  return v[0].toUpperCase() + v.substring(1);
}

function status(val) {
  return val === 1 ? true : false;
}

const RegistrationGroup = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: "TITLE_ALREADY_USED",
      get: ucFirst,
    },
    slug: { type: String, slug: "title", lowercase: true },
    isDeleted: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date, default: null },
    status: { type: Number, get: status, required: false, default: 1 },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: { getters: true, setters: true, virtuals: false },
    toJSON: { getters: true, setters: true, virtuals: false },
  }
);
RegistrationGroup.plugin(Unique);
RegistrationGroup.plugin(mongoosePaginate);
RegistrationGroup.plugin(slug),
  (module.exports = mongoose.model("RegistrationGroup", RegistrationGroup));
