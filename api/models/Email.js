const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const Unique = require("mongoose-beautiful-unique-validation")
var slug = require("mongoose-slug-updater")

function ucFirst(v) {
  if (v) {
    return v[0].toUpperCase() + v.substring(1)
  }
  return v
}

const EmailSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: "TITLE_ALREADY_USED",
      get: ucFirst,
    },
    subject: { type: String, required: false, get: ucFirst },
    description: { type: String, required: false },
    keyword: { type: String, required: false },
    slug: { type: String, slug: "title", lowercase: true },
    globalHeader: { type: Boolean, default: false },
    globalFooter: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: { getters: true, setters: true, virtuals: false },
    toJSON: { getters: true, setters: true, virtuals: false },
  }
)
EmailSchema.plugin(Unique)
EmailSchema.plugin(mongoosePaginate)
EmailSchema.plugin(slug),
  (module.exports = mongoose.model("Email", EmailSchema))
