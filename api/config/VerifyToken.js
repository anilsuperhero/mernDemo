var jwt = require("jsonwebtoken");
var fs = require("fs");
const PUBLIC_KEY = fs.readFileSync("config/public.key");
const { responseData } = require("../helpers/responseData");
function verifyToken(req, res, next) {
  //	next(); return;
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send(responseData("unauthorized", {}, 401));
  jwt.verify(token, PUBLIC_KEY, function (err, decoded) {
    if (err) return res.status(401).send(responseData("unauthorized", {}, 401));
    req.user_id = decoded.id;
    next();
  });
}

module.exports = verifyToken;
