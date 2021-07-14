var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Setting = new Schema(
  {
    name: { type: String, required: true },
    sort_name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    support_email: { type: String, required: false },
    number: { type: String, required: false },
    address: { type: String, required: false },
    copy_right: { type: String, required: false },
    definition: { type: String, required: false },
    email_header: { type: String, required: false },
    email_footer: { type: String, required: false },
    payment_terms: { type: String, required: false },
    banck_information: { type: String, required: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

module.exports = mongoose.model("Setting", Setting);
