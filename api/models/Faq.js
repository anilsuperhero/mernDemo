const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const Unique = require("mongoose-beautiful-unique-validation")
const slug = require("mongoose-slug-updater")

function ucFirst(v) {
  return v[0].toUpperCase() + v.substring(1)
}

function status(val) {
  return val === 1 ? true : false
}

const FaqSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: "TITLE_ALREADY_USED",
      get: ucFirst,
    },
    description: { type: String, required: false },
    index: { type: Number, default: 1 },
    slug: { type: String, slug: "title", lowercase: true },
    status: { type: Number, default: 1, get: status },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: { getters: true, setters: true, virtuals: false },
    toJSON: { getters: true, setters: true, virtuals: false },
  }
)
FaqSchema.plugin(mongoosePaginate)
FaqSchema.plugin(Unique)
FaqSchema.plugin(slug), (module.exports = mongoose.model("Faq", FaqSchema))
