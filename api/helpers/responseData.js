const __ = require("multi-lang")();

module.exports = {
  responseData: (message = "", result = {}, status) => {
    var response = {};
    response.status = status || 200;
    response.message = __(message, "en") || "SOMETHING_WENT_WRONG";
    response.data = result;
    return response;
  },
  setErrorMessage: (message) => {
    return __(message, "en");
  },
};
