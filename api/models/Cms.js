const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const Unique = require("mongoose-beautiful-unique-validation")
var slug = require("mongoose-slug-updater")

function ucFirst(v) {
  return v[0].toUpperCase() + v.substring(1)
}

const cmsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: "TITLE_ALREADY_USED",
      get: ucFirst,
    },
    content: { type: String, required: false },
    meta_title: { type: String, required: false },
    meta_key: { type: String, required: false },
    meta_desc: { type: String, required: false },
    slug: { type: String, slug: "title", lowercase: true },
    status: { type: Number, default: 1 },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: { getters: true, setters: true, virtuals: false },
    toJSON: { getters: true, setters: true, virtuals: false },
  }
)
cmsSchema.plugin(Unique)
cmsSchema.plugin(mongoosePaginate)
cmsSchema.plugin(slug), (module.exports = mongoose.model("Page", cmsSchema))
