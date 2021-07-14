require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");
var cors = require("cors");
require("./config/database");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var cmsRouter = require("./routes/cms");
var emailRouter = require("./routes/email");
var faqRouter = require("./routes/faq");
var customerRouter = require("./routes/customer");
var adminRouter = require("./routes/admin");
var auditorRouter = require("./routes/auditor");
var settingRouter = require("./routes/settings");
var notificationRouter = require("./routes/notification");
var registrationGroupRouter = require("./routes/registrationGroup");
var dcoumentTypeRouter = require("./routes/documentType");
var otherDocumentRouter = require("./routes/otherDocument");
var idDocumentRouter = require("./routes/idDocument");
var KeyPersonalRouter = require("./routes/keyPersonal");
var Transaction = require("./routes/transaction");
var AuditsRouter = require("./routes/audits");

var app = express();

var corsOption = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-access-token"],
};

app.use(cors(corsOption));
app.use(fileUpload());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/v1/", indexRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/cms", cmsRouter);
app.use("/v1/email", emailRouter);
app.use("/v1/auditor", auditorRouter);
app.use("/v1/faq", faqRouter);
app.use("/v1/setting", settingRouter);
app.use("/v1/notification", notificationRouter);
app.use("/v1/customer", customerRouter);
app.use("/v1/admin", adminRouter);
app.use("/v1/registrationGroup", registrationGroupRouter);
app.use("/v1/dcoumentType", dcoumentTypeRouter);
app.use("/v1/otherDocument", otherDocumentRouter);
app.use("/v1/idDocument", idDocumentRouter);
app.use("/v1/keyPersonal", KeyPersonalRouter);
app.use("/v1/auditRequest", AuditsRouter);
app.use("/v1/transaction", Transaction);

app.use("/static", express.static(path.join(__dirname, "public/images/")));
app.use(
  "/userImage",
  express.static(path.join(__dirname, "public/avatar/thumb/"))
);
app.use(
  "/document",
  express.static(path.join(__dirname, "public/audit-document/sla/"))
);
app.use("/invoice", express.static(path.join(__dirname, "public/invoices/")));

app.use(function (req, res) {
  res.status(404).json({
    status: 404,
    message: "Sorry can't find that!",
    data: {},
  });
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.json({
    status: err.status,
    message: err.message,
    data: {},
  });
  next();
});

module.exports = app;
