const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

function ucFirst(v) {
  return v[0].toUpperCase() + v.substring(1)
}

const ContactSchema = mongoose.Schema(
  {
    first_name: { type: String, get: ucFirst, required: true },
    last_name: { type: String, get: ucFirst, required: true },
    email: { type: String, required: true },
    mobile_number: { type: String, required: false },
    message: { type: String, required: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: { getters: true, setters: true, virtuals: false },
    toJSON: { getters: true, setters: true, virtuals: false },
  }
)
ContactSchema.plugin(mongoosePaginate)
ContactSchema.plugin(mongoosePaginate)
module.exports = mongoose.model("ContactUs", ContactSchema)
