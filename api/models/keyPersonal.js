const { Schema, model } = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

function ucFirst(v) {
  return v[0].toUpperCase() + v.substring(1);
}
function status(val) {
  return val === 1 ? true : false;
}

var KeyPersonnel = new Schema(
  {
    first_name: { type: String, get: ucFirst, required: true },
    middle_name: { type: String },
    last_name: { type: String, get: ucFirst, required: true },
    type: {
      type: String,
      enum: ["PERSONNEL", "STAFF"],
      default: "PERSONNEL",
    },
    email: {
      type: String,
      required: true,
      unique: "EMAIL_NUMBER_ALREADY_USED",
      index: true,
    },
    mobile_number: {
      type: String,
      required: false,
      unique: "MOBILE_NUMBER_ALREADY_USED",
      index: true,
    },
    company_id: { type: Schema.Types.ObjectId, ref: "User" },
    positionHeld: { type: String, required: false },
    dob: {
      type: Date,
      required: false,
    },
    status: { type: Number, get: status, required: false },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
    toObject: { getters: true, setters: true, virtuals: false },
    toJSON: { getters: true, setters: true, virtuals: false },
  }
);

KeyPersonnel.plugin(beautifyUnique);
KeyPersonnel.plugin(mongoosePaginate);
KeyPersonnel.plugin(aggregatePaginate);
module.exports = model("KeyPersonnel", KeyPersonnel);
