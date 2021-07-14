var mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

function ucFirst(v) {
  return v[0].toUpperCase() + v.substring(1)
}

function status(val) {
  return val === 1 ? true : false
}

var Schema = mongoose.Schema
var Notification = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, get: ucFirst, index: true },
    description: { type: String, required: true },
    action: { type: String, required: false },
    status: { type: Number, get: status, required: false, default: 0 },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
)
Notification.plugin(mongoosePaginate)
module.exports = mongoose.model("Notification", Notification)
