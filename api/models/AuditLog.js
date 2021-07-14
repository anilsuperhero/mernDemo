const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const AuditLogSchema = mongoose.Schema(
  {
    audit_id: { type: Schema.Types.ObjectId, ref: "Audits", required: true },
    audit_number: { type: String, required: false },
    company_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["VERIFICATION", "CERTIFICATION"],
      default: "VERIFICATION",
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
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toObject: { getters: true, setters: true, virtuals: false },
    toJSON: { getters: true, setters: true, virtuals: false },
  }
);

AuditLogSchema.set("toObject", { getters: true });
AuditLogSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("audit_logs", AuditLogSchema);
