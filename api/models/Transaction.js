const { Schema, model } = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
var uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate-v2");

const transactionSchema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "User" },
    auditId: { type: Schema.Types.ObjectId, ref: "AuditRequest" },
    reciptNumber: { type: String, required: false, unique: true, index: true },
    transactionType: { type: String, enum: ["ONLINE", "BANKTRANSFER"] },
    amount: { type: Number },
    status: { type: String, enum: ["PENDING", "PAID"] },
    remarks: { type: String, required: false },
    paymentId: { type: String, required: false },
    invoicePath: { type: String, required: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: { getters: true, setters: true, virtuals: false },
    toJSON: { getters: true, setters: true, virtuals: false },
  }
);
transactionSchema.plugin(uniqueValidator, {
  message: "{PATH} is already registered.",
});
transactionSchema.plugin(aggregatePaginate);
transactionSchema.plugin(mongoosePaginate);
module.exports = model("Transaction", transactionSchema);
