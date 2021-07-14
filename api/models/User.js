var mongoose = require("mongoose");
const Unique = require("mongoose-beautiful-unique-validation");
const mongoosePaginate = require("mongoose-paginate-v2");
var Schema = mongoose.Schema;
const config = require("../config/config");
const fs = require("fs");

function ucFirst(v) {
  return v[0].toUpperCase() + v.substring(1);
}

function status(val) {
  return val === 1 ? true : false;
}

function imageURL(image) {
  const path = config.USER + "/" + image;
  if (fs.existsSync(path)) {
    return process.env.API_PATH + config.USER_IMAGE_PATH + "/" + image;
  } else {
    return process.env.API_PATH + config.USER_DEFULTY_IMAGE;
  }
}

var User = new Schema(
  {
    role_id: { type: Number, required: false },
    first_name: { type: String, get: ucFirst, required: true },
    last_name: { type: String, get: ucFirst, required: true },
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
    password: { type: String, required: false, minlength: 6 },
    token: { type: String, required: false },
    status: { type: Number, get: status, required: false },
    api_token: { type: String, required: false },
    image: { type: String, get: imageURL, required: false },
    old_image: { type: String, required: false },
    notification: { type: Number, default: 1 },
    last_login_at: { type: String, required: false },
    ip: { type: String, required: false },
    abn_number: { type: String, required: false },
    address: { type: String, required: false },
    address_line: { type: String, required: false },
    company_name: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    postcode: { type: String, required: false },
    otp: { type: String, required: false },
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

User.plugin(Unique);
User.plugin(mongoosePaginate);
module.exports = mongoose.model("User", User);
